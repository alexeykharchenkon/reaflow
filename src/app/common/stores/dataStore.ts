import { makeAutoObservable } from "mobx";
import { addNodeAndEdge, EdgeData, NodeData } from "reaflow";
import { Block } from "@models/Block";
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from "@models/ActionTypes";
import { dataService } from "@services/DataService";
import { PropertyModes } from "@models/PropertyModes";
import { Types } from "@models/Types";
import { SelectNoYes } from "@models/SelectNoYes";

export class DataStore {
    blocks: Block [] = dataService.blocksInit();
    edges: EdgeData[] = [];
    nodes: NodeData[] = [];
    selections: string[] = [];

    selectNoYes: SelectNoYes = {
        onYes: "",
        onNo: "",
    }

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
                var result;
                if(enteredNode?.data.type === Types[Types.SubWorkflow]) {
                    result = this.addNodeAndEdgeResult(block, enteredNode?.id);
                }else {
                    if(enteredNode?.parent) {
                        result = this.addNodeAndEdgeResult(block, enteredNode?.parent);
                    }else{
                        result = this.addNodeAndEdgeResult(block, "");
                    }
                }

                this.edges = result.edges;
                this.nodes = result.nodes;
                break;
            case ActionTypes.SETEDGES:
                if(from.data.type !== Types[Types.Decision])
                    this.setEdges(from.id, to.id, "");   
                break;
        }
    }

    addNodeAndEdgeResult = (block: Block, parentId: string) : any => {
        const id = uuidv4();
        return addNodeAndEdge(
            this.nodes,
            this.edges,
            {
                id,
                data: {...block.nodeParams},
                width: +block.width,
                height: +block.height,
                parent: parentId,
            },
        );
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
                this.removeEdges(element.from, element.to, element.id);
                break;
        }
    }

    removeEdges = (from: string, to: string, id: string) => {
        this.nodes.forEach(n=> {
            if(n.id === from){
                (+n.data.outputsCount--).toString();
            }else if(n.id === to){
                (+n.data.inputsCount--).toString();
            }
        });
        this.edges = this.edges.filter(e => e.id !== id);
        this.selections = [];
    }

    onClick = (event: any, element: any, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.ONCLICKEDGE:
                this.selections = [element.id];
                this.activeElement = element as EdgeData;
                this.propertyModes.nodeMode = false;
                this.propertyModes.edgeMode = true;
                this.nodes.forEach(n=> n.data.checked = false);
                break;
            case ActionTypes.ONCLICKNODE:
                this.selections = [element.id];
                this.activeElement = element as NodeData;
                this.propertyModes.nodeMode = true;
                this.propertyModes.edgeMode = false;
                this.nodes.forEach(n=> { 
                    if(n.id===element.id){n.data.checked = true;
                    }else{n.data.checked = false;} 
                });
                break;
            case ActionTypes.ONCLICKCANVAS:
                this.selections = [];
                this.propertyModes.nodeMode = false;
                this.propertyModes.edgeMode = false;
                this.activeElement = null;
                this.nodes.forEach(n=> n.data.checked = false);
                break;
            case ActionTypes.ONCLICKFOROBJ:
                console.log("ForObj");
        }
    }

    onPropertiesChange = (event: any, actionType: ActionTypes) => {
        const {name, value} = event.target;
        switch(actionType) {
            case ActionTypes.CHANGEDESICIONONYES:
               this.selectNoYes.onYes = value;
               this.activeElement = {...this.activeElement};
            break;
            case ActionTypes.CHANGEDESICIONONNO:
                this.selectNoYes.onNo = value;
                this.activeElement = {...this.activeElement};
             break;
            case ActionTypes.CHANGEOTHER: 
                if(this.propertyModes.nodeMode){
                    this.activeElement.data = {...this.activeElement.data, [name] : value};
                }else if(this.propertyModes.edgeMode) {
                    this.activeElement = {...this.activeElement, [name] : value};
                }
                this.activeElement = {...this.activeElement};
            break;
        }
    }

    saveProperties = (actionType: ActionTypes) => {
        let actEl = this.activeElement;
        switch(actionType) {
            case ActionTypes.SAVENODEDESICIONPROPERTIES:
                let edgeId = "";   
                this.edges.forEach(e => {
                    if(e.from === actEl.id) 
                        this.removeEdges(actEl.id, this.selectNoYes.onYes, e.id);
                });
                
                this.nodes.filter(n=> n.id === actEl.id).forEach(n=> {n.data.text = actEl.data.text;});
                
                this.setEdges(actEl.id, this.selectNoYes.onYes, "On Yes");
                this.setEdges(actEl.id, this.selectNoYes.onNo, "On No");
               
                this.selectNoYes.onYes = "";
                this.selectNoYes.onNo = "";
                break;
            case ActionTypes.SAVEEDGEPROPERTIES:
                this.edges.filter(e=> e.id === actEl.id).forEach(e=> {e.text = actEl.text;}); 
                break;
            case ActionTypes.SAVENODEOTHERPROPERTIES:
                this.nodes.filter(n=> n.id === actEl.id).forEach(n=> {n.data.text = actEl.data.text;});
                break;
        }

        this.nodes = this.nodes.filter(n=> n.id !== "");
    }

    setEdges = (fromId: string, toId: string, text: string) => {
        let to = this.nodes.find(n => n.id === toId) as NodeData;
        let from = this.nodes.find(n => n.id === fromId) as NodeData;

        if(+from?.data.outputsCount < +from?.data.maxOutputsCount &&
            +to?.data.inputsCount < +to?.data.maxInputsCount){
            const edgeId = uuidv4();
            this.edges = [...this.edges,
                {
                    id: edgeId,
                    from: from.id,
                    to: to?.id,
                    parent: to?.parent,
                    text: text,
                }
            ];
            this.nodes.forEach(n => {
                if(n.id === to?.id) (+n.data.inputsCount++).toString();
                if(n.id === from?.id) (+n.data.outputsCount++).toString();
            });
        }
    }

    saveDiagram = () => {
        localStorage.setItem("nodes", JSON.stringify(this.nodes));
        localStorage.setItem("edges", JSON.stringify(this.edges));
    }
}
