import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { reduxForm, Field, formValueSelector, formValues, change, reset } from 'redux-form';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import dateFormat from 'dateformat'
import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';

import { setConstruction, getConstructionById, initializeForm } from './ConstructionActions';

import DateFieldNative from '../../common/DateFieldNative';

const styles = defaultClass

class ConstructionForm extends Component {

    componentWillMount() {
        const { match: { params } } = this.props;

        if (params.construction_id) {

            this.props.getConstructionById(params.construction_id)
        } else {
            this.props.initializeForm();
        }
    }

    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, amount, handleSubmit } = this.props;

        const currencyMask = createNumberMask({
            prefix: 'R$ ',
            decimalPlaces: 0,
            locale: 'pt-BR',
        })
        const currencyMaskDec = createNumberMask({
            prefix: '',
            decimalPlaces: 4,
            locale: 'pt-BR',
        })
        let now = new Date();
        now = dateFormat(now, "yyyy-mm-dd")
        const selectItems = [
            { name: 'PRÉ LANÇAMENTO', id: 'PRÉ LANÇAMENTO' },
            { name: 'INICIADA', id: 'INICIADA' },
            { name: 'CONCLUÍDA', id: 'CONCLUÍDA' }
        ]

        return (
            <div className={classes.content} ref={forwardedRef}>
                <PageHeader
                    title="Obras"
                    subtitle="Cadastro de Obras"
                    linkTo="/"
                    buttonType="primary"
                />
                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(data => {
                        this.props.setConstruction(data)
                        this.props.history.pushState(null, '/');
                        this.props.history.push("/obras");
                    }
                    )} >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3}>
                                <Field
                                    name="name"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Nome"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="status"
                                    selectField={{ fullWidth: true }}
                                    component={InputSelect}
                                    selectItems={selectItems}
                                    label="Status"
                                    inputProps={{ name: 'status', id: 'selstatus' }}
                                />

                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="progress_value"
                                    textField={{ fullWidth: true }}
                                    type="number"
                                    component={LabelAndInput}
                                    label="Progresso (%)"
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="room_qt"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Qt Unidades"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="start_date"
                                    label="Data Início"
                                    textField={{ fullWidth: true }}
                                    component={DateFieldNative}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="lot_qt"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Qt Lotes"
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="tower_qt"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Qt Torres"
                                />
                            </Grid>

                            {/*
                    USAR FIELD ARRAY
                    <Grid item xs={12} md={12}>
                        <FieldArray name="accounts" component={AddPartyArray} {...classes} />
                    </Grid>
                    */}

                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={2}>

                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>

                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <br />


                </Grid>
            </div>
        )
    }
}

ConstructionForm.propTypes = {
    classes: PropTypes.object.isRequired
};

ConstructionForm = reduxForm({ form: 'ConstructionForm', destroyOnUnmount: false })(ConstructionForm);
const selector = formValueSelector('ConstructionForm')

const mapStateToPropos = state => ({
    list: state.selectInputs.list,
    amount: selector(state, 'amount')
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        setConstruction,
        change,
        getConstructionById,
        initializeForm
    }, dispatch);

ConstructionForm = connect(mapStateToPropos, mapDispatchToProps)(ConstructionForm)

//export default withStyles(styles)(ConstructionForm)
const Comp = withStyles(styles)(ConstructionForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);