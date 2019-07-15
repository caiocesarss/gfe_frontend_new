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
import { setParty, initPartyForm, initializeForm } from './PartyActions';
import InputSwitch from '../../common/InputSwitch';

const styles = defaultClass

const selectItems = [
    { name: 'Pessoa Física', id: 'F' },
    { name: 'Pessoa Jurídica', id: 'J' }
]

class Partyform extends Component {
    componentWillMount(){
        this.props.initPartyForm();
        this.props.initializeForm();
        this.props.dispatch(change("partyForm", "is_vendor", this.props.category == 'fornecedor'? 1 : 0));
        this.props.dispatch(change("partyForm", "is_customer", this.props.category == 'cliente'? 1 : 0));
    }
    
    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, handleSubmit } = this.props;
        let hiddenTypeName = '';
        let switchTypeName = '';
        let switchTypeLabel = '';
        if (this.props.category == 'fornecedor'){
            hiddenTypeName = 'is_vendor';
            switchTypeName = 'is_customer';
            switchTypeLabel = 'Cliente';
        } else {
            hiddenTypeName = 'is_customer';
            switchTypeName = 'is_vendor';
            switchTypeLabel = 'Fornecedor';
        }
        
        return (
            <div className={classes.content}>
                <PageHeader
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    
                    buttonType="primary"
                />

                <Grid item xs={12}>
                    <form role="form" onSubmit={handleSubmit(async data => {
                                                                        const result = await this.props.setParty(data)
                                                                        this.props.redirectPage(`/contasPessoa/${result.payload}`)
                                                                    })
                                                }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Field name={hiddenTypeName}
                                    component="input"
                                    type="hidden"
                                     />
                                
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
                            <Grid item xs={6} md={2}>
                                <Field name={switchTypeName}
                                    type="checkbox"
                                    component={InputSwitch}
                                    label={switchTypeLabel} />
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
    newPartyId: state.party.newPartyId
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        setParty: itm => dispatch(setParty(itm, ownProps)),
        initPartyForm,
        initializeForm,
        change
    }, dispatch);

Partyform = connect(mapStateToPropos, mapDispatchToProps)(Partyform)

const Comp = withStyles(styles)(Partyform)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);