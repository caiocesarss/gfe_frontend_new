import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { defaultClass } from '../../common/Constants';
import PropTypes from 'prop-types';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

import LabelAndInput from '../../common/LabelAndInput';
import InputSelect from '../../common/InputSelect';
import { getUF, getCitiesByUF } from './LocationActions';

const styles = defaultClass

const selectItems = [
    {
        value: 'CPF',
        label: 'CPF'
    }
    ,
    {
        value: 'CNPJ',
        label: 'CNPJ'
    }
]

class LocationForm extends Component {
    componentWillMount(){
        this.props.getUF();
    }



    render() {
        const { forwardedRef, ...props } = this.props;
        const { classes, partyAccountCities } = this.props;
        const UFData = this.props.UFList;
        const selectUF = UFData.map(item => {
            return ({name: item.code, id: item.uf_id})
        }) || [];

        let cityData = this.props.cityList;
        
        if (cityData.length < 1) {
            if (partyAccountCities ) {
                cityData = partyAccountCities.data;
            }
        }
        const selectCity = cityData.map(item => {
            return ({name: item.name, id:item.city_id})
        })

        const header = val => {
            return {
                marginTop: `${val}px`
            }
        } 

        const DocMask = createTextMask({
            pattern: '99.999-999',
            stripMask: false,
            guide: false
          });

        return (
            <div style={header(10)} className={classes.content} ref={forwardedRef}>
                <h4>Local</h4>
                <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3}>
                                <Field
                                    name="address_line"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Rua/Logradouro"
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="number"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Número"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="complement"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Complemento"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="district"
                                    normalize={value => value.toUpperCase()}
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="Bairro"
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="zip"
                                    textField={{ fullWidth: true }}
                                    component={LabelAndInput}
                                    label="CEP"
                                    {...DocMask}
                                />
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Field
                                    name="uf_id"
                                    component={InputSelect}
                                    selectField={{ fullWidth: true }}
                                    inputProps={{ name: 'uf', id: 'seluf' }}
                                    selectItems={selectUF}
                                    onChange={data => this.props.getCitiesByUF(data.target.value)}
                                    label="UF"
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Field
                                    name="city_id"
                                    component={InputSelect}
                                    selectField={{ fullWidth: true }}
                                    inputProps={{ name: 'city', id: 'selcity' }}
                                    selectItems={selectCity}
                                    label="Cidade"
                                />
                            </Grid>

                        </Grid>
                    
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </div>
        )
    }
}

LocationForm.propTypes = {
    classes: PropTypes.object.isRequired
};


const mapStateToPropos = state => ({
    UFList: state.location.UFList,
    cityList: state.location.cityList,
    partyAccountCities: state.party.partyAccountCities
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        getUF,
        getCitiesByUF
    }, dispatch);

LocationForm = connect(mapStateToPropos, mapDispatchToProps)(LocationForm)

const Comp = withStyles(styles)(LocationForm)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);