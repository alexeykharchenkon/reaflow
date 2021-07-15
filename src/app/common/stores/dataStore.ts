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

    activeElement: any = null;
    
    constructor(){
        makeAutoObservable(this);
    }

    setData = (block: Block, enteredNode: any, from: NodeData, to: NodeData, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.SETNODESANDEDGES:
                const id = uuidv4();
                const result = addNodeAndEdge(
                    this.nodes,
                    this.edges,
                    {
                        id,
                        text: block.name,
                        data: {...block.nodeParams}
                    },
                    enteredNode as NodeData
                );

                this.edges = result.edges;
                this.nodes = result.nodes;
                break;
            case ActionTypes.SETEDGES:
                if(+from.data.outputsCount < +from.data.maxOutputsCount &&
                    +to.data.inputsCount < +to.data.maxInputsCount){
                    const edgeId = uuidv4();
                    this.edges = [...this.edges,
                        {
                            id: edgeId,
                            from: from.id,
                            to: to.id,
                            parent: to.parent,
                        }
                    ];
                    this.nodes.forEach(n => {
                        if(n.id === to.id) (+n.data.inputsCount++).toString();
                        if(n.id === from.id) (+n.data.outputsCount++).toString();
                    });
                }
                break;
        }
    }

    removeElement = (event: any, element: any, actionType: ActionTypes)  => {
        switch(actionType) {
            case ActionTypes.REMOVENODE:
              // const result = removeAndUpsertNodes(this.nodes, this.edges, element);
              // this.edges = result.edges;
              //  this.nodes = result.nodes;
                this.selections = [];
                this.edges.forEach(e=> {
                    if(e.from === element.id){
                        this.nodes.forEach(n=> {
                            if(e.to === n.id)(+n.data.inputsCount--).toString();
                        });
                    }else if(e.to === element.id){
                        this.nodes.forEach(n=> {
                            if(e.from === n.id)(+n.data.outputsCount--).toString();
                        });
                    }
                });
                this.nodes = this.nodes.filter(n => n.id !== element.id);
                this.edges = this.edges.filter(e => e.from !== element.id);
                this.edges = this.edges.filter(e => e.to !== element.id);
                break;
            case ActionTypes.REMOVEEDGE:
                this.nodes.forEach(n=> {
                    if(n.id === element.from){
                        (+n.data.outputsCount--).toString();
                    }else if(n.id === element.to){
                        (+n.data.inputsCount--).toString();
                    }
                });
                this.edges = this.edges.filter(e => e.id !== element.id);
                this.selections = [];
                break;
        }
    }

    onClick = (event: any, element: any, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.ONCLICKEDGE:
                this.selections = [element.id];
               // this.activeElement = element as EdgeData;
                break;
            case ActionTypes.ONCLICKNODE:
                this.selections = [element.id];
                this.activeElement = element as NodeData;
                break;
            case ActionTypes.ONCLICKCANVAS:
                this.selections = [];
                break;
        }
    }

    onPropertiesChange = (event: any) => {
        const {name, value} = event.target;
        this.activeElement = {...this.activeElement, [name] : value}
    }

    saveProperties = () => {
        this.nodes.filter(n=> n.id === this.activeElement.id)
        .forEach(n=> {
            n.text = this.activeElement.text;
        });

        this.nodes = this.nodes.filter(n=> n.id !== "");
    }
}
