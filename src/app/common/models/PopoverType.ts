import { NodeData } from "reaflow";
import { SelectNoYes } from "./SelectNoYes";

export interface PopoverType {
    node: any;
    currentTarget: any;
    connectTo: string;
    selectNoYes: SelectNoYes;
    isOpen: boolean;
}