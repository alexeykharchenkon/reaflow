import { makeAutoObservable } from "mobx";
import { addNodeAndEdge, EdgeData, NodeData } from "reaflow";
import { Block } from "@models/Block";
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from "@models/ActionTypes";
import { dataService } from "@services/DataService";
import { PropertyModes } from "@models/PropertyModes";
import { Types } from "@models/Types";

export class DataStore {
    blocks: Block [] = dataService.blocksInit();
    edges: EdgeData[] = [];
    nodes: NodeData[] = [];
    selections: string[] = [];

    propertyModes: PropertyModes = {
        nodeMode: false,
        edgeMode: false,
    }

    activeElement: any = null;
    
    constructor(){
        makeAutoObservable(this);
    }

    setData = (block: Block, enteredNode: NodeData, from: NodeData, to: NodeData, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.SETNODESANDEDGES:
                const id = uuidv4();
                var result;
                if(enteredNode?.data.type === Types[Types.SubWorkflow]) {
                    result = addNodeAndEdge(
                        this.nodes,
                        this.edges,
                        {
                            id,
                            data: {...block.nodeParams},
                            width: +block.width,
                            height: +block.height,
                            parent: enteredNode?.id,
                        },
                    );
                }else {
                    result = addNodeAndEdge(
                        this.nodes,
                        this.edges,
                        {
                            id,
                            data: {...block.nodeParams},
                            width: +block.width,
                            height: +block.height,
                        },
                    );
                }

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
                            text: "Some Text"
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
                this.activeElement = element as EdgeData;
                this.propertyModes.nodeMode = false;
                this.propertyModes.edgeMode = true;
                break;
            case ActionTypes.ONCLICKNODE:
                this.selections = [element.id];
                this.activeElement = element as NodeData;
                this.propertyModes.nodeMode = true;
                this.propertyModes.edgeMode = false;
                break;
            case ActionTypes.ONCLICKCANVAS:
                this.selections = [];
                this.propertyModes.nodeMode = false;
                this.propertyModes.edgeMode = false;
                this.activeElement = null;
                break;
        }
    }

    onPropertiesChange = (event: any) => {
        const {name, value} = event.target;
        if(this.propertyModes.nodeMode){
        this.activeElement.data = {...this.activeElement.data, [name] : value};
        }else if(this.propertyModes.edgeMode) {
            this.activeElement = {...this.activeElement, [name] : value};
        }
        this.activeElement = {...this.activeElement};
    }

    saveProperties = () => {
        if(this.propertyModes.nodeMode){
            this.nodes.filter(n=> n.id === this.activeElement.id)
            .forEach(n=> {
                n.data.text = this.activeElement.data.text;
            });
        }else if(this.propertyModes.edgeMode) {
            this.edges.filter(e=> e.id === this.activeElement.id)
            .forEach(e=> {
                e.text = this.activeElement.text;
            }); 
        }

        this.nodes = this.nodes.filter(n=> n.id !== "");
    }
}
