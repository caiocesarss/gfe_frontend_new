import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector, formValues, change, FieldArray } from 'redux-form';

import { getList } from '../../common/SelectActions';
import AddPartyArray from './AddPartyArray';
import { createSaleParty } from './SalesOrdersActions';
import { Button } from '@material-ui/core';


const styles = defaultClass

class SalesFormAddParty extends Component {

    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, amount, handleSubmit } = this.props;

        return (
            <div className={classes.content} ref={forwardedRef}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <form role="form" onSubmit={handleSubmit(this.props.createSaleParty)} >
                            <FieldArray name="accounts" component={AddPartyArray} {...classes} />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

SalesFormAddParty.propTypes = {
    classes: PropTypes.object.isRequired
};

SalesFormAddParty = reduxForm({ form: 'SalesFormAddParty', destroyOnUnmount: false })(SalesFormAddParty);
const selector = formValueSelector('SalesFormAddParty')

const mapStateToPropos = state => ({
    amount: selector(state, 'amount')
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ getList, change, createSaleParty }, dispatch);

SalesFormAddParty = connect(mapStateToPropos, mapDispatchToProps)(SalesFormAddParty)

//export default withStyles(styles)(SalesFormAddParty)
const Comp = withStyles(styles)(SalesFormAddParty)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);