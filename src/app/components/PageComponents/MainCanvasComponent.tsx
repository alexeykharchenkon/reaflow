import React, { useState, useRef } from 'react';
import { CanvasRef, Node, Canvas, NodeData, EdgeData, Edge, useProximity } from 'reaflow';
import { motion, useDragControls} from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Block } from '@models/Block';
import { ActionTypes } from '@models/ActionTypes';
import { ElementsComponent } from '../ElementsComponents/ElementsComponent';

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
  const canvasRef = useRef<CanvasRef | null>(null);
  const [zoom, setZoom] = useState<number>(70);
  const dragControls = useDragControls();
  const [activeDrag, setActiveDrag] = useState<Block | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  const onZoomChange = (event: any) => {
    if(zoom > event.target.value){canvasRef?.current?.zoomOut?.();
    }else{canvasRef?.current?.zoomIn?.();}
    setZoom(event.target.value);
  }

  const onDragStart =  (event: any, data: Block) => {
    onProximityDragStart(event);
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event: any) => {
    if(droppable) setData(activeDrag, enteredNode, "", "", ActionTypes.SETNODESANDEDGES);
    setDroppable(false);
    setActiveDrag(null);

    onProximityDragEnd(event);
  };

  const onDrag = (event: any) => {
    onProximityDrag(event);
  };

  const {
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    canvasRef,
    onDistanceChange: (distance: number | null) => {
    },
    onMatchChange: (match: string | null) => {
      let matchNode: NodeData | null = null;
      if (match) matchNode = nodes.find(n => n.id === match) as NodeData;
      
      setEnteredNode(matchNode);
      setDroppable(matchNode !== null);
    }
  });
  
    return (
      <div className="mainCanvasComponent">
          <div className="leftCanvas">
            <div className="blocks_leftCanvas">
              <h3>ToolBox</h3>
              {blocks?.map(block => (
                <motion.div 
                  key={block.id} 
                  className={"block " + block.className}
                  onMouseDown={event => onDragStart(event, block)}
                >
                  {block.name}
                </motion.div>
              ))}
            </div>
            <div className="zoom_leftCanvas">
                <h3>Zoom & Pan</h3>
                <div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={zoom} 
                    onChange={onZoomChange}
                  />
                </div>
            </div>
          </div>
          <div className="middleCanvas">
            <Canvas
             
                layoutOptions={{'elk.hierarchyHandling':'INCLUDE_CHILDREN'}}
                className="canvas"
                maxZoom={2.5}
                minZoom={-1.5}
                zoom={zoom/100}
                ref={canvasRef}
                width={800}
                height={800}
                nodes={nodes}
                edges={edges}
                selections={selections}
                onNodeLink={(from: NodeData, to: NodeData) => setData("", enteredNode, from, to, ActionTypes.SETEDGES)}
                node={
                  (n => (
                  <Node
                  {...n}
                    className="node"
                    onRemove={(event, node) => removeElement(event, node, ActionTypes.REMOVENODE)}
                    onClick={(event, node) => onClick(event, node, ActionTypes.ONCLICKNODE)}
                  >
                      {(node) => <ElementsComponent element={node}/>}
                    </Node>
                  ))
                }
                edge={
                  <Edge
                    onClick={(event, edge) => onClick(event, edge, ActionTypes.ONCLICKEDGE)}
                    onRemove={(event, edge) => removeElement(event, edge, ActionTypes.REMOVEEDGE)}
                    className="edge"
                  />
                }
                onCanvasClick={(event) => onClick(event, "", ActionTypes.ONCLICKCANVAS)}
                onMouseEnter={() => setDroppable(true)}
                onMouseLeave={() => setDroppable(false)}
                onZoomChange={z => setZoom(z)}
            />
            <motion.div
              drag
              dragControls={dragControls}
              onDrag={onDrag}
              className="dragger"
              onDragEnd={onDragEnd}
            >
                {activeDrag && (
                  <div className="dragInner">
                    {activeDrag.name}
                  </div>
                )}
            </motion.div>
          </div> 
        </div>
    );
  });



