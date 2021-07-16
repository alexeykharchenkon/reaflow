import { NodeParams } from "./NodeParams";

export interface Block {
    id: string;
    name: string;
    nodeParams: NodeParams;
    className: string;
}