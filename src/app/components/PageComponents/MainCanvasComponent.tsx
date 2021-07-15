import React, { useState, useRef } from 'react';
import { useProximity, CanvasRef, Node, Canvas, hasLink, NodeData, EdgeData, addNodeAndEdge, removeNode, Edge, removeEdge, MarkerArrow } from 'reaflow';
import { motion, useDragControls} from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Block } from '@models/Block';
import { ActionTypes } from '@models/ActionTypes';

interface MainCanvasProps {
  edges: EdgeData[];
  nodes: NodeData[];
  blocks: Block[];
  selections: string[];
  onClick: any;
  removeElement: any;
  setData: any;
}

export const MainCanvasComponent = observer(({edges, nodes, blocks, selections,
  onClick, removeElement, setData} : MainCanvasProps ) => {

  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);

  const onDragStart =  (event: any, data: string) => {
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event: any) => {
    if(droppable) setData(activeDrag, enteredNode, "", "", ActionTypes.SETNODESANDEDGES);

    setDroppable(false);
    setActiveDrag(null);
    setEnteredNode(null);
  };
  
    return (
      <div className="mainCanvasComponent">
          <div className="leftCanvas">
            {blocks?.map(block => (
              <motion.div key={block.id} className="block" onMouseDown={event => onDragStart(event, block.name)}>
                {block.name}
              </motion.div>
            ))}
          </div>
          <div className="middleCanvas">
            <Canvas
                className="canvas"
                width={650}
                height={650}
                nodes={nodes}
                edges={edges}
                selections={selections}
                onNodeLink={(from: NodeData, to: NodeData) => setData("", "", from, to, ActionTypes.SETEDGES)}
                node={
                  <Node
                    onEnter={(event, node) => setEnteredNode(node)}
                    onLeave={(event, node) => setEnteredNode(null)}
                    onRemove={(event, node) => removeElement(event, node, ActionTypes.REMOVENODE)}
                    onClick={(event, node) => onClick(event, node, ActionTypes.ONCLICKNODE)}
                  />
                }
                edge={
                  <Edge
                    onClick={(event, edge) => onClick(event, edge, ActionTypes.ONCLICKEDGE)}
                    onRemove={(event, edge) => removeElement(event, edge, ActionTypes.REMOVEEDGE)}
                  />
                }
                onCanvasClick={(event) => onClick(event, "", ActionTypes.ONCLICKCANVAS)}
                onMouseEnter={() => setDroppable(true)}
                onMouseLeave={() => setDroppable(false)}
            />
            <motion.div
              drag
              dragControls={dragControls}
              className="dragger"
              onDragEnd={onDragEnd}
            >
                {activeDrag && (
                  <div className="dragInner">
                    {activeDrag}
                  </div>
                )}
            </motion.div>
          </div> 
        </div>
    );
  });
