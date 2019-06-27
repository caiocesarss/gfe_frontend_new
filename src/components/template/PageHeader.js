import React from 'react'
import {Typography, 
        CssBaseline,
        Grid,
        Link,
        Button } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';   
import { makeStyles } from '@material-ui/core/styles';   

import AddIcon from '@material-ui/icons/Add'; 
import PageHeaderRight from '../template/PageHeaderRight';
import If from '../../common/If';

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
  
       
        <Grid container spacing={1} ref={ref}>
        <CssBaseline />
        <Grid item xs={9}>
        <If test={props.title}>
            <Typography variant="h4" gutterBottom>
            {props.title}
            </Typography>
            <Typography variant="h5" gutterBottom>
            {props.subtitle}
            </Typography>
        </If>
        <If test={props.smallTitle}>
            <Typography variant="h5" gutterBottom>
            {props.smallTitle}
            </Typography>
            <Typography variant="h6" gutterBottom>
            {props.smallSubtitle}
            </Typography>
        </If>
        </Grid>
        <If test={props.showPageHeaderRight}>
          <PageHeaderRight 
            linkTo={props.linkTo} 
            buttonType={props.buttonType}
          />
          </If>
        </Grid>

        
    )
})
