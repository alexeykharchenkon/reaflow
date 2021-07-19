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
            },
            className: "startElement",
            width: "100",
            height: "100",
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
                text: "Phase",
            },
            className: "phaseElement",
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
                text: "Sub Workflow",
            },
            className: "subWorkflowBlockElement",
            width: "300",
            height: "300",
        }
    ];

    return blocks;
    }
}

export const dataService = new DataService();