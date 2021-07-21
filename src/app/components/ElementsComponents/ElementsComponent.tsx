import { ActionTypes } from "@models/ActionTypes"
import { Types } from "@models/Types"
import { observer } from "mobx-react-lite";


interface ElementsProps {
  element: any;
  onClick: any;
}

export const ElementsComponent = observer(({element, onClick} : ElementsProps) => {
    let forObjClassName = "element " + element.node.data.className;
    forObjClassName += element.node.data.checked ? " checked": "";

    return (
      <foreignObject
        pointerEvents={"none"}
        className={forObjClassName}
        width={element.width}
        height={element.height}
        onClick={()=> onClick("","", ActionTypes.ONCLICKFOROBJ)}
        >
          {element?.node.data?.type.toString() !== Types[Types.Decision] &&
            <div>
                <h3>{element.node.data.text}</h3>
            </div>
          }
          {element?.node.data?.type.toString() === Types[Types.Decision] &&
            <div className="desicionElementText">
                <h3>{element.node.data.text}</h3>
            </div>
          }
       </foreignObject>
    )});


    