import React from 'react';
import PartyDetail from './PartyDetail';

export default props => {
    const { match: { params } } = props;
    function redirectPage(path) {
        props.history.push(path);
    }

    return (
        <PartyDetail
            category="fornecedor"
            title="Fornecedor"
            subtitle="Cadastro de Fornecedor"
            redirectPage={redirectPage}
            partyId={params.party_id}
        />
    )
}