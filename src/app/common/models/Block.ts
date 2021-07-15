import { NodeParams } from "./NodeParams";

export interface Block {
    id: string;
    type: string;
    name: string;
    nodeParams: NodeParams;
}