import React, { useState, useRef } from 'react';
import { CanvasRef, Node, Canvas, NodeData, EdgeData, Edge, useProximity, MarkerArrow, Port} from 'reaflow';
import { motion, useDragControls} from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Block } from '@models/Block';
import { ActionTypes } from '@models/ActionTypes';
import { ElementsComponent } from '../ElementsComponents/ElementsComponent';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { IconButton } from '@material-ui/core';
import { PopoverComponent } from '../PopoverComponent/PopoverComponent';
import { PopoverType } from '@models/PopoverType';

interface MainCanvasProps {
  edges: EdgeData[];
  nodes: NodeData[];
  blocks: Block[];
  selections: string[];
  onClick: any;
  removeElement: any;
  setData: any;
  popoverElement: PopoverType;
  onPopoverChange: any;
}

export const MainCanvasComponent = observer(({edges, nodes, blocks, selections,
  onClick, removeElement, setData, popoverElement, onPopoverChange} : MainCanvasProps ) => {

  const [open, setOpen] = useState(false);
  const popoverClose = () => {setOpen(false)};

  const canvasRef = useRef<CanvasRef | null>(null);
  const [zoom, setZoom] = useState<number>(0.7);
  const dragControls = useDragControls();
  const [activeDrag, setActiveDrag] = useState<Block | null>(null);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  const onNodeClick = (event:any, node:NodeData)  => {
    onClick(event, node, ActionTypes.ONCLICKNODE);
    setOpen(true);
  }

  const onZoomChange = (event: any) => {
    if(event === ActionTypes.ZOOMIN) {canvasRef?.current?.zoomIn?.();
    }else if(event === ActionTypes.ZOOMOUT) {canvasRef?.current?.zoomOut?.();}
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
           <div className="zoom_leftCanvas">
            <h3>Zoom & Pan</h3>
            <div className="zoom_leftCanvas_Zoom">
              <IconButton onClick={() => onZoomChange(ActionTypes.ZOOMOUT)}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton onClick={() => onZoomChange(ActionTypes.ZOOMIN)}>
                <ZoomInIcon />
              </IconButton>
            </div>
            </div>
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
          </div>
          <div className="middleCanvas">
            <Canvas
                layoutOptions={{'elk.hierarchyHandling':'INCLUDE_CHILDREN'}}
                className="canvas"
                zoomable={false}
                maxZoom={0.7}
                minZoom={-0.9}
                zoom={zoom}
                ref={canvasRef}
                center={true}
                fit={true}
                pannable={true}
                maxHeight={1000}
                maxWidth={2000}
                height={700}
                width={document.documentElement.clientWidth-450}
                nodes={nodes}
                edges={edges}
                selections={selections}
                onNodeLink={(from: NodeData, to: NodeData, port: any) => setData("", enteredNode, from, to, ActionTypes.SETEDGES)}
                node={
                  (n => (
                  <Node
                  {...n}
                    port={<Port style={{fill: 'blue', stroke: 'white'}} rx={10} ry={10}/>}
                    className="node"
                    onRemove={(event, node) => removeElement(event, node, ActionTypes.REMOVENODE)}
                    onClick={(event, node) => onNodeClick(event, node)}
                  >
                      {(event:any) => <ElementsComponent 
                        onClick={onClick}
                        element={event}
                      />}
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
                arrow={<MarkerArrow style={{ fill: 'blue' }} />}
                onCanvasClick={(event) => onClick(event, "", ActionTypes.ONCLICKCANVAS)}
                onMouseEnter={() => setDroppable(true)}
                onMouseLeave={() => setDroppable(false)}
                onZoomChange={z => setZoom(z)}
                onLayoutChange={layout => {console.log(layout)}}
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
            <PopoverComponent 
              open={open} 
              onClose={popoverClose}
              nodes={nodes}
              popoverElement={popoverElement}
              onPopoverChange={onPopoverChange}
            />
          </div> 
        </div>
    );
  });



