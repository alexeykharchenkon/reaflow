import { makeAutoObservable } from "mobx";
import { addNodeAndEdge, EdgeData, NodeData, removeAndUpsertNodes } from "reaflow";
import { Block } from "@common/models/Block";
import { Types } from "@common/models/Types";
import { v4 as uuidv4 } from 'uuid';

export class DataStore {
    blocks: Block [] = [
        {
            id: uuidv4(),
            type: Types[Types.Start],
            name: "Start",
        },
        {
            id: uuidv4(),
            type: Types[Types.Decision],
            name: "Decision",
        },
        {
            id: uuidv4(),
            type: Types[Types.Phase],
            name: "Phase",
        },
    ];
    edges: EdgeData[] = [];
    nodes: NodeData[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    setNodesAndEdges = (text: string, enteredNode: any) => {
        const id = uuidv4();
        const result = addNodeAndEdge(
            this.nodes,
            this.edges,
            {
              id,
              text
            },
            enteredNode as NodeData
          );

          this.edges = result.edges;
          this.nodes = result.nodes;
    }

    setEdges = (from: NodeData, to: NodeData) => {
        const id = `${from.id}-${to.id}`;
        this.edges = [...this.edges,
          {
            id,
            from: from.id,
            to: to.id,
            parent: to.parent
          }
        ];
    }

    removeNode = (event: any, node: NodeData) => {
        const result = removeAndUpsertNodes(this.nodes, this.edges, node);
        this.edges = result.edges;
        this.nodes = result.nodes;
    }

    setNodes = (nodeData: NodeData[]) => {
        this.nodes = nodeData;
    }
}
