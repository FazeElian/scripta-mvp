import { Binary, Braces, Bug, Code, Cpu, GitGraph, Hash, Terminal, type LucideIcon } from "lucide-react";

type AvatarType = {
    icon: LucideIcon;
    className: string;
}

export type AvatarId = "Terminal" | "Braces" | "Cpu" | "Code" | "Hash" | "Bug" | "Binary" | "GitGraph";

export const avatars: Record<string, AvatarType> = {
    Terminal: { icon: Terminal, className: "avatar--yellow" },
    Braces:   { icon: Braces,   className: "avatar--pink" },
    Cpu:      { icon: Cpu,      className: "avatar--purple" },
    Code:     { icon: Code,     className: "avatar--blue" },
    Hash:     { icon: Hash,     className: "avatar--sky-blue" },
    Bug:      { icon: Bug,      className: "avatar--seagreen" },
    Binary:   { icon: Binary,   className: "avatar--orange" },
    GitGraph: { icon: GitGraph, className: "avatar--red" },
};