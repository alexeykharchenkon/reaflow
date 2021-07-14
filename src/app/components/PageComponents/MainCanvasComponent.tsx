import React, { useState, useRef } from 'react';
import { useProximity, CanvasRef, Node, Canvas, hasLink, NodeData, EdgeData, addNodeAndEdge } from 'reaflow';
import { motion, useDragControls} from 'framer-motion';

export const MainCanvasComponent = () => {
  const dragControls = useDragControls();
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [edges, setEdges] = useState<EdgeData[]>([
    {
      id: '1-2',
      from: '1',
      to: '2'
    }
  ]);
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      id: '1',
      text: '1'
    },
    {
      id: '2',
      text: '2'
    }
  ]);

  const onDragStart =  (event: any, data: any) => {
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event: any) => {
    if (droppable) {
      const id = `${activeDrag}-${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`;
      const result = addNodeAndEdge(
        nodes,
        edges,
        {
          id,
          text: id
        },
        enteredNode as NodeData
      );
      setNodes(result.nodes);
      setEdges(result.edges);
    }

    setDroppable(false);
    setActiveDrag(null);
    setEnteredNode(null);
  };

    return (
      <div className="mainCanvasComponent">
          <div className="leftCanvas">
            <motion.div className="block" onMouseDown={event => onDragStart(event, '1')}>
              Block 1
            </motion.div>
            <motion.div className="block" onMouseDown={event => onDragStart(event, '2')}>
              Block 2
            </motion.div>
          </div>
          <div className="middleCanvas">
            <Canvas
                maxWidth={500}
                maxHeight={500}
                nodes={nodes}
                edges={edges}
                node={
                  <Node
                    onEnter={(event, node) => setEnteredNode(node)}
                    onLeave={(event, node) => setEnteredNode(null)}
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
  }