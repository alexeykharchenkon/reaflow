import { makeAutoObservable } from "mobx";
import { addNodeAndEdge, EdgeData, NodeData, removeAndUpsertNodes } from "reaflow";
import { Block } from "@models/Block";
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from "@models/ActionTypes";
import { dataService } from "@services/DataService";

export class DataStore {
    blocks: Block [] = dataService.blocksInit();
    edges: EdgeData[] = [];
    nodes: NodeData[] = [];
    selections: string[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    setData = (block: string, enteredNode: any, from: NodeData, to: NodeData, actionType: ActionTypes) => {
        console.log(from.data)
        switch(actionType) {
            case ActionTypes.SETNODESANDEDGES:
                const id = uuidv4();
                const result = addNodeAndEdge(
                    this.nodes,
                    this.edges,
                    {
                        id,
                        text: block,
                        data: block
                    },
                    enteredNode as NodeData
                );

                this.edges = result.edges;
                this.nodes = result.nodes;
                break;
            case ActionTypes.SETEDGES:
                const edgeId = uuidv4();
                this.edges = [...this.edges,
                    {
                        id: edgeId,
                        from: from.id,
                        to: to.id,
                        parent: to.parent
                    }
                ];
                break;
        }
    }

    removeElement = (event: any, element: any, actionType: ActionTypes)  => {
        switch(actionType) {
            case ActionTypes.REMOVENODE:
                const result = removeAndUpsertNodes(this.nodes, this.edges, element);
                this.selections = [];
                this.edges = result.edges;
                this.nodes = result.nodes;
                break;
            case ActionTypes.REMOVEEDGE:
                this.edges = this.edges.filter(e => e.id !== element.id);
                this.selections = [];
                break;
        }
    }

    onClick = (event: any, element: any, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.ONCLICKEDGE:
                this.selections = [element.id];
                break;
            case ActionTypes.ONCLICKNODE:
                this.selections = [element.id];
                break;
            case ActionTypes.ONCLICKCANVAS:
                this.selections = [];
                break;
        }
    }
}
