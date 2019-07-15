import React from 'react';
import PartyDetail from './PartyDetail';

export default props => {
    const { match: { params } } = props;
    function redirectPage(path) {
        props.history.push(path);
    }

    return (
        <PartyDetail
            category="cliente"
            title="Cliente"
            subtitle="Cadastro de Cliente"
            redirectPage={redirectPage}
            partyId={params.party_id}
        />
    )
}