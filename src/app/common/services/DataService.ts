import { Block } from "@models/Block";
import { Types } from "@models/Types";
import { v4 as uuidv4 } from 'uuid';

class DataService {
    blocksInit () : Block[]{
        const blocks = [
        {
            id: uuidv4(),
            type: Types[Types.Start],
            name: "Start",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '0',
                maxOutputsCount: '1'
            }
        },
        {
            id: uuidv4(),
            type: Types[Types.Decision],
            name: "Decision",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '1',
                maxOutputsCount: '2'
            }
        },
        {
            id: uuidv4(),
            type: Types[Types.Phase],
            name: "Phase",
            nodeParams: {
                inputsCount: '0',
                outputsCount: '0',
                maxInputsCount: '2',
                maxOutputsCount: '1'
            }
        },
    ];

    return blocks;
    }
}

export const dataService = new DataService();