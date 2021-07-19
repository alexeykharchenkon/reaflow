import { Types } from "@models/Types"


interface ElementsProps {
  element: any;
}

export const ElementsComponent = ({element} : ElementsProps) => {
  console.log(element)
    return (
      <foreignObject
        pointerEvents={"none"}
        className={element.node.data.className}
        width={element.width}
        height={element.height}
        x={0} 
        y={0}
        >
          {element?.node.data?.type.toString() !== Types[Types.Decision] &&
            <div className="element">
                <h3>{element.node.data.text}</h3>
            </div>
          }
          {element?.node.data?.type.toString() === Types[Types.Decision] &&
            <div className="desicionElementText">
                <h3>{element.node.data.text}</h3>
            </div>
          }
       </foreignObject>
    )}
