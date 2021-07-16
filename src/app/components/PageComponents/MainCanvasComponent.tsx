import React, { useState, useRef } from 'react';
import { CanvasRef, Node, Canvas, NodeData, EdgeData, Edge, removeEdge, MarkerArrow, PortData, Port } from 'reaflow';
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
  const ref = useRef<CanvasRef | null>(null);
  const [zoom, setZoom] = useState<number>(70);
  const dragControls = useDragControls();
  const [activeDrag, setActiveDrag] = useState<Block | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);

  const onZoomChange = (event: any) => {
    if(zoom > event.target.value){ref?.current?.zoomOut?.();
    }else{ref?.current?.zoomIn?.();}
    setZoom(event.target.value);
  }

  const onDragStart =  (event: any, data: Block) => {
    setActiveDrag(data);
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event: any) => {
    if(droppable) setData(activeDrag, "", "", ActionTypes.SETNODESANDEDGES);
    setDroppable(false);
    setActiveDrag(null);
  };
  
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
                className="canvas"
                maxZoom={2.5}
                minZoom={-1.5}
                zoom={zoom/100}
                ref={ref}
                width={600}
                height={500}
                nodes={nodes}
                edges={edges}
                selections={selections}
                onNodeLink={(from: NodeData, to: NodeData) => setData("", from, to, ActionTypes.SETEDGES)}
                node={
                  <Node
                    className="node"
                    onRemove={(event, node) => removeElement(event, node, ActionTypes.REMOVENODE)}
                    onClick={(event, node) => onClick(event, node, ActionTypes.ONCLICKNODE)}
                  >
                      {(node) => <ElementsComponent element={node}/>}
                    </Node>
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


