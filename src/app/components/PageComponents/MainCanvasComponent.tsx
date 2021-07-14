import React, { useState, useRef } from 'react';
import { useProximity, CanvasRef, Node, Canvas, hasLink, NodeData, EdgeData, addNodeAndEdge, removeNode } from 'reaflow';
import { motion, useDragControls} from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Block } from '@common/models/Block';

interface MainCanvasProps {
  edges: EdgeData[];
  nodes: NodeData[];
  blocks: Block[];
  setNodesAndEdges: any;
  setEdges: any;
  removeNode: any;
}

export const MainCanvasComponent = observer(({edges, nodes, blocks,
  setNodesAndEdges, setEdges, removeNode} : MainCanvasProps ) => {

  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);

  const onDragStart =  (event: any, data: string) => {
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event: any) => {
    if(droppable) setNodesAndEdges(activeDrag, enteredNode);

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
                maxWidth={500}
                maxHeight={500}
                nodes={nodes}
                edges={edges}
                onNodeLink={(from: NodeData, to: NodeData) => setEdges(from, to)}
                node={
                  <Node
                    onEnter={(event, node) => setEnteredNode(node)}
                    onLeave={(event, node) => setEnteredNode(null)}
                    onRemove={(event, node) => removeNode(event, node)}
                  />
                }
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
