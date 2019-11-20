import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { defaultPageStyle } from '../../common/Constants';

const usty = defaultPageStyle();
const useStyles = makeStyles({

    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    let classes = usty();
    // classes = {...classes, defaultPageStyle}
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className={classes.content}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={1}>
                    <Card className={classes.card}>
                        <Link component={RouterLink} to="/settings/cub">
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Cadastro de CUB
                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
                <Grid item xs={6} md={1}>
                    <Card className={classes.card}>
                        <Link component={RouterLink} to="/settings/usuario">
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Cadastro de Usuários
                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
