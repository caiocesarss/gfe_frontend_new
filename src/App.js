import React from "react";
import { HashRouter} from "react-router-dom";
import 'typeface-roboto';

import { makeStyles} from "@material-ui/core/styles";

import Routes from './Routes';
import  AppBar  from './components/template/AppBar';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
}))

function App() {
  const classes = useStyles();
  return (
    <HashRouter basename="/app">
    <div className={classes.root}>
    
    <AppBar />
      
    <Routes />
    </div>
    </HashRouter>
  );
}

export default App;
