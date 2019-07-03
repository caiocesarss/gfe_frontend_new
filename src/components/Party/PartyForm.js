import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import PartyAccountForm from './PartyAccountForm';
import LocationForm from '../Location/LocationForm';
import { setParty } from './PartyActions';

const styles = defaultClass

const selectItems = [
    { name: 'Pessoa Física', id: 'F' },
    { name: 'Pessoa Jurídica', id: 'J' }
]

class Partyform extends Component {

    
    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, handleSubmit } = this.props;
        return (
            <div className={classes.content}>
                <PageHeader
                    title="Clientes"
                    subtitle="Cadastro de Clientes"
                    linkTo="/clientes/detalhes"
                    buttonType="primary"
                />

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(data => this.props.setParty(data))}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Field name="name"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Nome" />
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Field name="type"
                                    component={InputSelect}
                                    selectField={{ fullWidth: true }}
                                    label="Tipo"
                                    inputProps={{ name: 'constructionSelect', id: 'selconst' }}
                                    selectItems={selectItems} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <PartyAccountForm />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <LocationForm />
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

Partyform.propTypes = {
    classes: PropTypes.object.isRequired
};

Partyform = reduxForm({ form: 'partyForm', destroyOnUnmount: false })(Partyform);
const mapStateToPropos = state => ({
    UFList: state.location.UFList,
    cityList: state.location.cityList
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        setParty
    }, dispatch);

Partyform = connect(mapStateToPropos, mapDispatchToProps)(Partyform)

const Comp = withStyles(styles)(Partyform)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);