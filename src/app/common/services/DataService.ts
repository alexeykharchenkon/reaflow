import { Block } from "@models/Block";
import { Types } from "@models/Types";
import { v4 as uuidv4 } from 'uuid';

class DataService {
    blocksInit () : Block[]{
        const blocks = [
        {
            id: uuidv4(),
            name: "Start",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '0',
                maxOutputsCount: '1',
                type: Types[Types.Start],
                className: "startElement",
                text: "Start",
                checked: false,
            },
            className: "startBlockElement",
            width: "70",
            height: "70",
        },
        {
            id: uuidv4(),
            name: "Decision",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '1',
                maxOutputsCount: '2',
                type: Types[Types.Decision],
                className: "desicionElement",
                checked: false,
                text: "Decision",
            },
            className: "desicionBlockElement",
            width: "100",
            height: "100",
        },
        {
            id: uuidv4(),
            name: "Phase",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '5',
                maxOutputsCount: '1',
                type: Types[Types.Phase],
                className: "phaseElement",
                checked: false,
                text: "Phase",
            },
            className: "phaseBlockElement",
            width: "100",
            height: "100",
        },
        {
            id: uuidv4(),
            name: "Sub Workflow",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '1',
                maxOutputsCount: '1',
                type: Types[Types.SubWorkflow],
                className: "subWorkflowElement",
                checked: false,
                text: "Sub Workflow",
            },
            className: "subWorkflowBlockElement",
            width: "300",
            height: "300",
        },
        {
            id: uuidv4(),
            name: "End",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '5',
                maxOutputsCount: '0',
                type: Types[Types.End],
                className: "endElement",
                checked: false,
                text: "End",
            },
            className: "endBlockElement",
            width: "70",
            height: "70",
        }
    ];

    return blocks;
    }
}

export const dataService = new DataService();