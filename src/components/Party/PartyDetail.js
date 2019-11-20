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
import { updateParty, initPartyForm, getPartyById, initializeForm } from './PartyActions';
import InputSwitch from '../../common/InputSwitch';

const styles = defaultClass

const selectItems = [
    { name: 'Pessoa Física', id: 'F' },
    { name: 'Pessoa Jurídica', id: 'J' }
]

class PartyDetail extends Component {
    componentDidMount() {
        //const { match: { params } } = this.props;

        this.props.initializeForm();
        this.props.getPartyById(this.props.partyId);
    }

    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, handleSubmit } = this.props;
        const { partyById } = this.props;
        let switchTypeName = '';
        let switchTypeLabel = '';
        if (this.props.category == 'fornecedor') {
            switchTypeName = 'is_customer';
            switchTypeLabel = 'Cliente';
        } else {

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
                        const result = await this.props.updateParty(data)
                        this.props.redirectPage(`/pessoa/${this.props.category}`)

                    })
                    }>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={3}>
                                <Field name="name"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Nome" />
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Field name="type"
                                    component={InputSelect}
                                    selectField={{ fullWidth: true }}
                                    label="Tipo"
                                    inputProps={{ name: 'type', id: 'seltype' }}
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
                                <Button size="large" color="primary" type="submit" variant="contained" className={classes.button}>Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>


            </div>
        )
    }
}

PartyDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

PartyDetail = reduxForm({ form: 'partyForm', destroyOnUnmount: false })(PartyDetail);
const mapStateToPropos = state => ({
    partyById: state.party.partyById
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        updateParty,
        initPartyForm,
        getPartyById,
        change,
        initializeForm
    }, dispatch);

PartyDetail = connect(mapStateToPropos, mapDispatchToProps)(PartyDetail)

const Comp = withStyles(styles)(PartyDetail)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);