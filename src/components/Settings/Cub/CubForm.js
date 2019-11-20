import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';


import {
    setCub,
    getCubById,
    initializeForm
} from './CubActions';

import { defaultClass } from '../../../common/Constants';
import PageHeader from '../../template/PageHeader';
import LabelAndInput from '../../../common/LabelAndInput';
import InputSelect from '../../../common/InputSelect';
import DateFieldNative from '../../../common/DateFieldNative';
import InputSwitch from '../../../common/InputSwitch';

const styles = defaultClass

class CubForm extends Component {

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.initializeForm();
        if (params.cub_id) {
            this.props.getCubById(params.cub_id);
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
                    title="Cub"
                    subtitle="Cadastro de valores mensais do Cub"
                />
                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                        (await this.props.setCub(data))
                        this.props.history.push("/settings/cub");
                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={1}>
                                <Field name="cub_id"
                                    type="hidden"
                                    component="input"
                                />
                                <Field name="year"

                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Ano" />
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <Field name="month"

                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Mês" />
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Field name="amount"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Valor"
                                    {...currencyMask} />
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

CubForm = reduxForm({ form: 'cubForm', destroyOnUnmount: false })(CubForm);

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        setCub,
        getCubById,
        change,
        initializeForm
    }, dispatch);

CubForm = connect(null, mapDispatchToProps)(CubForm)

const Comp = withStyles(styles)(CubForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);