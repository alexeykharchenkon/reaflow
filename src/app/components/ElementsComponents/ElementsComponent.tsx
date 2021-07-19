
interface ElementsProps {
  element: any;
}

export const ElementsComponent = ({element} : ElementsProps) => {
    return (
      <foreignObject
        pointerEvents={"none"}
        className={element.node.data.className}
        width={element.width}
        height={element.height}
        x={0} 
        y={0}
        >
            <div style={{ padding: 10, textAlign: 'center' }}>
                <h3>{element.node.data.text}</h3>
            </div>
       </foreignObject>
    )}
