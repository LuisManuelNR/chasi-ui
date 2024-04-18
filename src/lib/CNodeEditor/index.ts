export type Connections = Record<string, string>
export type NodeSocket = Record<string, any>
export type NodesMap = {
  [key: string]: {
    inputs?: NodeSocket
    outputs?: NodeSocket
  }
}
export type Nodes = {
  [key: string]: {
    id: string
    name: string
    position: number[]
    inputs?: NodeSocket
    outputs?: NodeSocket
  }
}