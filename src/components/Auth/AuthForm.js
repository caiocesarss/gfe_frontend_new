import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from "redux";
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { login, signup } from "./AuthActions";
import { defaultClass, loginClass } from '../../common/Constants';
import LabelAndInput from '../../common/LabelAndInput';
import logoExcellence from '../../images/logoexcellence.png';

const { styles } = loginClass;
const {loginStyles} = defaultClass;


class AuthForm extends Component {
    onSubmit(values) {
        const { login, signup } = this.props;

    }
    render() {
        const { classes, handleSubmit } = this.props;
 
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                    <img src={logoExcellence} alt="Logo" />
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Acesso
                        </Typography>
                        <form className={classes.form} role="form" onSubmit={handleSubmit(async data => {
                            (await this.props.login(data))
                            //this.props.history.push("/payables");
                        })
                        }>
                            <Field name="user_id"
                                type="hidden"
                                component="input"
                            />
                            <Field name="username"
                                normalize={value => value.toUpperCase()}
                                margin="normal"
                                textField={{ fullWidth: true, autoFocus: true, required: true }}
                                component={LabelAndInput}
                                label="Nome de Usuário" />
                            <Field name="password"
                                normalize={value => value.toUpperCase()}
                                margin="normal"
                                type="password"
                                textField={{ fullWidth: true, required: true }}
                                component={LabelAndInput}
                                label="Senha" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                
                                className={classes.submit}
                            >
                                Entrar
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Esqueceu a Senha?
                                    </Link>
                                </Grid>
                                
                            </Grid>

                        </form>
                    </div>
                </Grid>
            </Grid>

        );
    }
}

AuthForm = reduxForm({ form: 'authForm', destroyOnUnmount: false })(AuthForm);

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        login,
        signup
    }, dispatch);

AuthForm = connect(null, mapDispatchToProps)(AuthForm)

AuthForm = withStyles(loginStyles)(AuthForm)
AuthForm = withStyles(loginClass)(AuthForm)
export default
    React.forwardRef((props, ref) => <AuthForm {...props} forwardedRef={ref} />);