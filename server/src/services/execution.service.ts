import { spawn } from "child_process";
import { writeFileSync, unlinkSync, mkdirSync } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import os from "os";

export interface ExecutionRequest {
    language: "javascript" | "typescript" | "python" | "cpp" | "java";
    code: string;
    stdin?: string;
}

export interface ExecutionResult {
    stdout: string;
    stderr: string;
    exitCode: number;
    executionTime?: number;
}

interface RuntimeConfig {
    ext: string;
    buildCmd?: (filepath: string, tmpDir: string) => string;
    runCmd: (filepath: string, tmpDir: string) => { cmd: string; args: string[] };
}

const RUNTIMES: Record<string, RuntimeConfig> = {
    javascript: {
        ext: "js",
        runCmd: (filepath) => ({ cmd: "node", args: [filepath] }),
    },
    typescript: {
        ext: "ts",
        runCmd: (filepath) => ({ 
            cmd: "ts-node", 
            args: ["--skip-project", "--compiler-options", "{\"module\":\"commonjs\"}", filepath] 
        }),
    },
    python: {
        ext: "py",
        runCmd: (filepath) => ({ cmd: "python3", args: [filepath] }),
    },
    cpp: {
        ext: "cpp",
        buildCmd: (filepath, tmpDir) => `g++ ${filepath} -o ${path.join(tmpDir, "main")}`,
        runCmd: (_, tmpDir) => ({ cmd: path.join(tmpDir, "main"), args: [] }),
    },
    java: {
        ext: "java",
        buildCmd: (filepath, tmpDir) => `cd ${tmpDir} && javac ${path.basename(filepath)}`,
        runCmd: (_, tmpDir) => ({ cmd: "java", args: ["-cp", tmpDir, "Main"] }),
    },
};

function runProcess(cmd: string, args: string[], tmpDir: string, stdin?: string, timeout = 10000): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve) => {
        const proc = spawn(cmd, args, { cwd: tmpDir, timeout });

        let stdout = "";
        let stderr = "";

        if (stdin) proc.stdin.write(stdin);
        proc.stdin.end();

        proc.stdout.on("data", (d) => stdout += d.toString());
        proc.stderr.on("data", (d) => stderr += d.toString());

        proc.on("close", (code) => resolve({ stdout, stderr, exitCode: code ?? -1 }));
        proc.on("error", (err) => resolve({ stdout: "", stderr: err.message, exitCode: -1 }));
    });
}

export default class ExecutionService {
    async executeCode(req: ExecutionRequest): Promise<ExecutionResult> {
        const runtime = RUNTIMES[req.language];
        if (!runtime) throw new Error(`Language '${req.language}' not supported`);

        const id = randomUUID();
        const tmpDir = path.join(os.tmpdir(), `scripta_${id}`);
        mkdirSync(tmpDir, { recursive: true });

        const filename = req.language === "java" ? "Main.java" : `main.${runtime.ext}`;
        const filepath = path.join(tmpDir, filename);
        writeFileSync(filepath, req.code);

        const start = Date.now();

        try {
            if (runtime.buildCmd) {
                const buildCommand = runtime.buildCmd(filepath, tmpDir);
                const build = await runProcess("bash", ["-c", buildCommand], tmpDir);

                if (build.exitCode !== 0) {
                    return {
                    stdout: "",
                    stderr: build.stderr,
                    exitCode: build.exitCode,
                    executionTime: Date.now() - start,
                    };
                }
            }

            const { cmd, args } = runtime.runCmd(filepath, tmpDir);
            const result = await runProcess(cmd, args, tmpDir, req.stdin);

            return {
                ...result,
                executionTime: Date.now() - start,
            };
        } finally {
            try { unlinkSync(filepath); } catch {}
        }
    }
}