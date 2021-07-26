import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
start: {
  background:'#61F861', 
  width: '70px', 
  height: '70px',
},
startTypography: {
  background:'#61F861', 
  height: '70px',
},
end: {
  background:'#D06CFF', 
  width: '70px', 
  height: '70px',
},
endTypography: {
  background:'#D06CFF', 
  width: '70px', 
  height: '70px',
},
phase: {
  background:'#F7F7B5', 
  width: '100px', 
  height: '100px',
},
phaseTypography: {
  background:'#F7F7B5', 
  width: '100px', 
  height: '100px',
},
subWorkFlow: {
 // minWidth: '200px',
  backgroundColor:'#919169', 
  textAlign: 'center',
},
subWorkFlowTypography: {
  background:'#919169', 
},
subWorkFlowAddButton: {
  display: 'inline-block',
},
decision: {
  background:'#DDDD7A', 
  width: '100px', 
  height: '100px',  
},
decisionTypography: {
  background:'#DDDD7A', 
  width: '100px', 
  height: '100px',
  transform: 'rotate(-45deg)'

},
}))