import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector, change } from 'redux-form';
import Button from '@material-ui/core/Button';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import PageHeader from '../template/PageHeader';
import PartyAccountForm from './PartyAccountForm';
import LocationForm from '../Location/LocationForm';
import { setPartyAccount, getPartyById } from './PartyActions';

const styles = defaultClass

const selectItems = [
    { name: 'Pessoa Física', id: 'F' },
    { name: 'Pessoa Jurídica', id: 'J' }
]

class PartyAccountPreForm extends Component {
    componentDidMount(){
        const { match: { params } } = this.props;
        this.props.getPartyById(params.party_id);
        this.props.dispatch(change("PartyAccountForm", "party_id", params.party_id));
    }
    
    render() {
        const { forwardedRef, ...props } = this.props;
        const { match: { params } } = this.props;
        const { classes, handleSubmit, partyById } = this.props;

        return (
            <div className={classes.content}>
                <PageHeader
                    title="Contas de Cliente"
                    subtitle={`Cadastro de Contas do Cliente ${partyById.name}`}
                />

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                                                                        const result = await this.props.setPartyAccount(data)
                                                                        this.props.history.push(`/contasClientes/${result.payload.party_id}`);
                                                                    })
                                                }>
                        <Field 
                            component="input"
                            name="party_id"
                            type="hidden"
                        />
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

PartyAccountPreForm.propTypes = {
    classes: PropTypes.object.isRequired
};

PartyAccountPreForm = reduxForm({ form: 'PartyAccountForm', destroyOnUnmount: false })(PartyAccountPreForm);
const mapStateToPropos = state => ({
    partyById: state.party.partyById
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ getPartyById, setPartyAccount, change }, dispatch);

PartyAccountPreForm = connect(mapStateToPropos, mapDispatchToProps)(PartyAccountPreForm)

const Comp = withStyles(styles)(PartyAccountPreForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);