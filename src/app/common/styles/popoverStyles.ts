import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
start: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
},
linkButton: {
    width: '20px',
    height: '20px',
    marginLeft: '10px',
},
decision: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
},
decisionSelectors: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
},
}))