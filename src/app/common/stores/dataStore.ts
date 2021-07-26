import { makeAutoObservable } from "mobx";
import { addNodeAndEdge, EdgeData, NodeData} from "reaflow";
import { Block } from "@models/Block";
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from "@models/ActionTypes";
import { dataService } from "@services/DataService";
import { PropertyModes } from "@models/PropertyModes";
import { Types } from "@models/Types";
import { SelectNoYes } from "@models/SelectNoYes";
import { PopoverType } from "../models/PopoverType";

export class DataStore {
    blocks: Block [] = dataService.blocksInit();
    edges: EdgeData[] = [];
    nodes: NodeData[] = [];
    selections: string[] = [];

    selectNoYes: SelectNoYes = {onYes: "", onNo: ""}

    propertyModes: PropertyModes = {nodeMode: false, edgeMode: false}

    activeElement: any = null;

    popoverElement: PopoverType = {
        node: null,
        currentTarget: null,
        connectTo: "",
        selectNoYes: {onYes: "", onNo: ""},
        isOpen: false,
    };
    
    constructor(){
        makeAutoObservable(this);
        const startBlock = dataService.blockGenerate();
        var result = this.addNodeAndEdgeResult(startBlock, "", startBlock.id);
        this.nodes = result.nodes;
    }

    setData = (block: Block, enteredNode: NodeData, from: NodeData, to: NodeData, actionType: ActionTypes) => {
        switch(actionType) {
            case ActionTypes.SETNODESANDEDGES:
                var result;
                const id = uuidv4();
                if(enteredNode?.data.type === Types[Types.SubWorkflow]) {
                    result = this.addNodeAndEdgeResult(block, enteredNode?.id, id);
                    this.nodes = result.nodes;
                }else {
                    if(enteredNode?.parent) {
                        result = this.addNodeAndEdgeResult(block, enteredNode?.parent, id);
                        this.nodes = result.nodes;
                    }else{
                        result = this.addNodeAndEdgeResult(block, "", id);
                        this.nodes = result.nodes;
                        if(block.nodeParams.type === Types[Types.SubWorkflow]) {
                            const startBlock = dataService.blockGenerate();
                            result = this.addNodeAndEdgeResult(startBlock, id, startBlock.id);
                            this.nodes = result.nodes;
                        }
                    }
                }
                break;
            case ActionTypes.SETEDGES:
                if(from.data.type !== Types[Types.Decision])
                    this.setEdges(from.id, to.id, "");   
                break;
        }
    }

    addNodeAndEdgeResult = (block: Block, parentId: string, id: string) : any => {
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
                this.removeNode(element);
                break;
            case ActionTypes.REMOVEEDGE:
                this.removeEdges(element.from, element.to, element.id);
                break;
        }
    }

    removeNode = (element: any) => {
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
               // this.selections = [element.id];
                this.activeElement = element as NodeData;
                this.propertyModes.nodeMode = true;
                this.propertyModes.edgeMode = false;
                this.nodes.forEach(n => n.data.checked = n.id === element.id ? true: false);
                if(element?.data.type !== Types[Types.End]) {
                    this.popoverElement.currentTarget = event.currentTarget;
                    this.popoverElement.node = this.activeElement;
                    this.popoverElement.isOpen = true;
                    this.popoverElement = {...this.popoverElement};
                }
                break;
            case ActionTypes.ONCLICKCANVAS:
                this.selections = [];
                this.propertyModes.nodeMode = false;
                this.propertyModes.edgeMode = false;
                this.activeElement = null;
                this.nodes.forEach(n => n.data.checked = false);
                break;
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
                this.nodes.filter(n=> n.id === actEl.id).forEach(n=> {n.data.text = actEl.data.text;});
                this.connectDecision(actEl, this.selectNoYes);
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

    onPopoverChange = (event: any, actionType: ActionTypes) => {
        const {value} = event?.target;
        let popEl = this.popoverElement;

        switch(actionType) {
            case ActionTypes.CHANGECONNECTTO:
                this.popoverElement.connectTo = value;
                this.popoverElement = {...this.popoverElement};
                break;
            case ActionTypes.CHANGECONNECTONYES:
                this.popoverElement.selectNoYes.onYes = value;
                this.popoverElement = {...this.popoverElement};
                break;
            case ActionTypes.CHANGECONNECTONNO:
                this.popoverElement.selectNoYes.onNo = value;
                this.popoverElement = {...this.popoverElement};
                break;
            case ActionTypes.SAVECONNECTTO:
                this.popoverElement.isOpen = false;
                this.connectNode(popEl.node, popEl.connectTo);
                this.popoverElement.connectTo = "";
                break;
            case ActionTypes.SAVECONNECTYESNO:
                this.popoverElement.isOpen = false;
                this.connectDecision(popEl.node, popEl.selectNoYes);
                this.popoverElement.selectNoYes.onYes = "";
                this.popoverElement.selectNoYes.onNo = "";
                break;
            case ActionTypes.DELETENODE:
                this.popoverElement.isOpen = false;
                this.removeNode(popEl.node);
                break;
            case ActionTypes.ONPOPOVERCLOSE:
                this.popoverElement.isOpen = false;
                this.popoverElement = {...this.popoverElement};
                break;
        }
    }

    connectNode = (node: NodeData, connectTo: string) => {
        this.edges.forEach(e => {
            e.from === node.id && this.removeEdges(e?.from as string, e?.to as string, e.id);
        });
        let parentId = this.nodes.find(n=> n.id === connectTo)?.parent;
        node.parent === parentId && this.setEdges(node.id, connectTo, "");
    }

    connectDecision = (node: NodeData, selectNoYes: SelectNoYes) => {
        this.edges.forEach(e => {
            e.from === node.id && this.removeEdges(e?.from as string, e?.to as string, e.id);
        });

        let yesParent = this.nodes.find(n=> n.id === selectNoYes.onYes)?.parent;
        let noParent = this.nodes.find(n=> n.id === selectNoYes.onNo)?.parent;

        node.parent === yesParent && this.setEdges(node.id, selectNoYes.onYes, "On Yes");
        node.parent === noParent && this.setEdges(node.id, selectNoYes.onNo, "On No"); 
    } 

    saveDiagram = () => {
        localStorage.setItem("nodes", JSON.stringify(this.nodes));
        localStorage.setItem("edges", JSON.stringify(this.edges));
    }
}
