export type Connections = Record<string, string>
export type NodeSocket = Record<string, any>
export type NodesMap = {
  [key: string]: {
    inputs?: NodeSocket
    outputs?: NodeSocket
    component?: any
  }
}
export type Nodes = {
  [key: string]: NodesMap[string] & {
    id: string
    position: number[]
  }
}