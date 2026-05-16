import { useCallback, useEffect, useRef } from "react"

// React flow
import {
    ReactFlow,
    Controls,
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    type NodeProps,
    type Node,
    type Edge,
    type NodeChange,
} from "@xyflow/react"
import dagre from "@dagrejs/dagre"
import { RefreshCw, Sparkles } from "lucide-react"
import "@xyflow/react/dist/style.css"

// Types
import {
    type FlowEdge,
    type FlowNode,
    type FlowDiagram as FlowDiagramType
} from "@/types/diagrams.type"

type Props = {
    diagram: FlowDiagramType
    regenerate: () => void
    generating: boolean
    onDiagramChange: (val: FlowDiagramType | null) => void;
}

const NODE_WIDTH = 160
const NODE_HEIGHT = 80

function applyDagreLayout(nodes: FlowNode[], edges: FlowEdge[]): Node[] {
    const g = new dagre.graphlib.Graph()
    g.setDefaultEdgeLabel(() => ({}))
    g.setGraph({ rankdir: "TB", nodesep: 60, ranksep: 80 })

    nodes.forEach((n) => g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT }))
    edges.forEach((e) => g.setEdge(e.source, e.target))

    dagre.layout(g)

    return nodes.map((n) => {
        const { x, y } = g.node(n.id)
        return { ...n, position: { x: x - NODE_WIDTH / 2, y: y - NODE_HEIGHT / 2 } }
    })
}

const handleStyle = { background: "#07b863", width: 8, height: 8, border: "none" }

const CustomInput = ({ data }: NodeProps) => (
    <>
        <div style={{
            background: "rgba(7,184,99,0.12)",
            color: "#e0e0e0",
            border: "1.5px solid rgba(7,184,99,0.9)",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: "13px",
            minWidth: "120px",
            textAlign: "center",
            fontWeight: 600,
        }}>
            {String(data.label)}
        </div>
        <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </>
)

const CustomOutput = ({ data }: NodeProps) => (
    <>
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <div style={{
            background: "rgba(7,184,99,0.06)",
            color: "#e0e0e0",
            border: "1.5px solid rgba(7,184,99,0.45)",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: "13px",
            minWidth: "120px",
            textAlign: "center",
            fontWeight: 600,
        }}>
            {String(data.label)}
        </div>
    </>
)

const CustomDefault = ({ data }: NodeProps) => (
    <>
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <div style={{
            background: "#0d0d0d",
            color: "#e0e0e0",
            border: "1px solid #1a3d2b",
            borderRadius: "6px",
            padding: "8px 16px",
            fontSize: "13px",
            minWidth: "130px",
            textAlign: "center",
        }}>
            {String(data.label)}
        </div>
        <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </>
)

const CustomDecision = ({ data }: NodeProps) => (
    <>
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <div style={{ position: "relative", width: 140, height: 80, background: "transparent" }}>
            <svg width="140" height="80" viewBox="0 0 140 80" style={{ position: "absolute", top: 0, left: 0 }}>
                <polygon
                    points="70,4 136,40 70,76 4,40"
                    fill="#0d0d0d"
                    stroke="rgba(7,184,99,0.7)"
                    strokeWidth="1.5"
                />
            </svg>
            <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e0e0e0",
                fontSize: "11px",
                textAlign: "center",
                padding: "0 20px",
                pointerEvents: "none",
            }}>
                {String(data.label)}
            </div>
        </div>
        <Handle type="source" position={Position.Left} id="left" style={{ ...handleStyle, top: "50%" }} />
        <Handle type="source" position={Position.Right} id="right" style={{ ...handleStyle, top: "50%" }} />
        <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
    </>
)

const nodeTypes = {
    default: CustomDefault,
    input: CustomInput,
    output: CustomOutput,
    decision: CustomDecision,
}

export const FlowDiagram = ({ diagram, regenerate, generating, onDiagramChange }: Props) => {
    const laid = applyDagreLayout(diagram.nodes, diagram.edges)
    const [nodes, setNodes, onNodesChange] = useNodesState(laid)
    const [edges, setEdges, onEdgesChange] = useEdgesState(diagram.edges as Edge[])

    // Solo sincroniza cuando llega un diagrama nuevo (regenerate)
    const prevDiagramRef = useRef(diagram)
    useEffect(() => {
        if (prevDiagramRef.current === diagram) return
        prevDiagramRef.current = diagram
        setNodes(applyDagreLayout(diagram.nodes, diagram.edges))
        setEdges(diagram.edges as Edge[])
    }, [diagram, setNodes, setEdges])

    // Solo notifica al padre cuando el usuario termina de arrastrar
    const handleNodesChange = useCallback(
        (changes: NodeChange[]) => {
            onNodesChange(changes)
            const hasDrag = changes.some(c => c.type === "position" && !c.dragging)
            if (hasDrag) {
                // usar setTimeout para leer el estado actualizado
                setTimeout(() => {
                    setNodes(current => {
                        onDiagramChange({
                            nodes: current.map(n => ({
                                id: n.id,
                                data: n.data as { label: string },
                                position: n.position,
                                type: n.type as FlowNode["type"],
                            })),
                            edges: edges.map(e => ({
                                id: e.id,
                                source: e.source,
                                target: e.target,
                                label: e.label as string | undefined,
                                animated: e.animated,
                            })),
                        })
                        return current
                    })
                }, 0)
            }
        },
        [onNodesChange, onDiagramChange, edges]
    )

    return (
        <div className="diagram-shell">
            <div className="diagram-toolbar">
                <button onClick={regenerate} disabled={generating}>
                    {generating ? <Sparkles size={16} /> : <RefreshCw size={16} />}
                    {generating ? "Regenerating..." : "Regenerate"}
                </button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                proOptions={{ hideAttribution: true }}
                edgesFocusable={false}
                style={{ background: "#080808" }}
            >
                <style>{`
                    .react-flow__node { background: transparent !important; border: none !important; padding: 0 !important; box-shadow: none !important; }
                    .react-flow__node.selected > div { outline: none !important; }
                    .react-flow__edge-path { stroke: rgba(7,184,99,0.6); stroke-width: 1.5; }
                    .react-flow__edge-textbg { fill: transparent !important; }
                    .react-flow__edge-text { fill: rgba(7,184,99,0.8) !important; font-size: 11px !important; font-weight: 600; }
                    .react-flow__controls-button { background: #0d0d0d !important; border-color: #1a3d2b !important; color: #e0e0e0; fill: #e0e0e0; }
                    .react-flow__controls-button:hover { background: #1a3d2b !important; }
                    .react-flow__controls { background: #0d0d0d !important; border: 1px solid #1a3d2b !important; border-radius: 8px; }
                    .react-flow__background pattern circle { fill: #505050 !important; }
                `}</style>
                <Controls showInteractive={false} />
                <Background variant={BackgroundVariant.Dots} gap={14} size={1.5} color="#404040" />
            </ReactFlow>
        </div>
    )
}