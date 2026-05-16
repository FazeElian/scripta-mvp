export type FlowNode = {
    id: string
    data: { label: string }
    position: { x: number; y: number }
    type?: "input" | "output" | "default" | "decision"
}

export type FlowEdge = {
    id: string
    source: string
    target: string
    label?: string
    animated?: boolean
}

export type FlowDiagram = {
    nodes: FlowNode[]
    edges: FlowEdge[]
}