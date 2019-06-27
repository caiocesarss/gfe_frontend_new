import React from 'react'
import {Typography, 
        CssBaseline,
        Grid,
        Link,
        Button } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';   
import { makeStyles } from '@material-ui/core/styles';   

import AddIcon from '@material-ui/icons/Add'; 

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));

export default React.forwardRef((props, ref)  => {
    const classes = useStyles();
    return (
        <Grid item xs={3} ref={ref}>
          <Grid container direction="row" justify="flex-end">
          <Link component={RouterLink} to={props.linkTo}>
          <Button size="large" variant="contained" color={props.buttonType} className={classes.button}>
          Incluir
          <AddIcon className={classes.rightIcon} />
          </Button>
          </Link>
          </Grid>
        </Grid>
    )
})
