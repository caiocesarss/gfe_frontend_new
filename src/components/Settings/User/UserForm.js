import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';


import {
    setUser,
    getUserById,
    initializeForm
} from './UserActions';

import { defaultClass } from '../../../common/Constants';
import PageHeader from '../../template/PageHeader';
import LabelAndInput from '../../../common/LabelAndInput';
import InputSelect from '../../../common/InputSelect';
import DateFieldNative from '../../../common/DateFieldNative';
import InputSwitch from '../../../common/InputSwitch';

const styles = defaultClass

class UserForm extends Component {

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.initializeForm();
        if (params.user_id) {
            this.props.getUserById(params.user_id);
        }
    }

    render() {
        const { classes, handleSubmit } = this.props;


        const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 2,
            locale: 'pt-BR',
        })




        return (
            <div className={classes.content}>
                <PageHeader
                    title="User"
                    subtitle="Cadastro de Usuários"
                />
                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        (await this.props.setUser(data))
                        this.props.history.push("/settings/user");
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Field name="user_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field name="person_name"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Nome" />
                            </Grid>


                            <Grid item xs={6} md={3}>
                                <Field name="email"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="E-mail" />
                            </Grid>

                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={2}>
                                <Field name="username"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Username" />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field name="password"
                                    type="password"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Senha" />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field name="confirm_password"
                                normalize={value => value.toUpperCase()}
                                    type="password"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Confirmar Senha" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </div>
        )
    }
}

UserForm = reduxForm({ form: 'userForm', destroyOnUnmount: false })(UserForm);

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setUser,
        getUserById,
        change,
        initializeForm
    }, dispatch);

UserForm = connect(null, mapDispatchToProps)(UserForm)

const Comp = withStyles(styles)(UserForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);