import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from "@material-ui/core";
import { useStore } from "@stores/rootStore";
import { observer } from "mobx-react-lite";


export const TopPageComponent = observer(() => {
  const {dataStore} = useStore();  
    return (
      <div className="topPageComponent">
        <IconButton onClick={dataStore.saveDiagram}>
            <SaveIcon />
        </IconButton>
      </div>
    );
  });