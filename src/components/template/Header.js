import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    }
}))
export default props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        </div>
    )
}