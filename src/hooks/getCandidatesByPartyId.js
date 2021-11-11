import { filter, cloneDeep } from 'lodash'

export const getCandidatesByPartyId = ( currentPeriod, papeletas, partyId ) => { 
    
    const filteredByPeriod = papeletas.nodes.filter( 
                                _ => (_.papeletaDetails.papeletaPartidoPeriodo[0].databaseId === currentPeriod.databaseId)
                             );

    let candidateList, candidateListByPartyId;
    candidateList = {
        legislative: {
            principals: [],
            list: [],
            nominal: [],
        },
        municipal: {
            principals: [],
            list: [],
            nominal: [],
        }
    }
    candidateListByPartyId = {
        legislative: {
            principal: {},
            list: [],
            nominal: [],
        },
        municipal: {
            principal: {},
            list: [],
            nominal: [],
        }
    }
    let tempParty = []
    let tempPartyId = []

    filteredByPeriod.forEach( ( ballot, index) => {
        // TODO: DRY
        tempParty[index] = ballot.papeletaDetails.papeletaPartidoPartido[0].partidoDetails
        tempPartyId[index] = ballot.papeletaDetails.papeletaPartidoPartido[0].databaseId
        // Legislative
        ballot.papeletaDetails.papeletaPartidoGobernador?.forEach( ( candidate, i ) => {
            candidateList.legislative.principals.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
        ballot.papeletaDetails.papeletaPartidoLista?.forEach( ( candidate, i ) => {
            candidateList.legislative.list.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
        ballot.papeletaDetails.papeletaPartidoNominal?.forEach( ( candidate, i ) => {
            candidateList.legislative.nominal.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
        // Municipal
        ballot.papeletaDetails.papeletaPartidoAlcalde?.forEach( ( candidate, i ) => {
            candidateList.municipal.principals.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
        ballot.papeletaDetails.papeletaPartidoCmLista?.forEach( ( candidate, i ) => {
            candidateList.municipal.list.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
        ballot.papeletaDetails.papeletaPartidoCmNominal?.forEach( ( candidate, i ) => {
            candidateList.municipal.nominal.push( Object.assign(candidate, {party: tempParty[index], partyId: tempPartyId[index] } ) )
        })
    });

    // Legislative
    candidateListByPartyId.legislative.principal   = cloneDeep(filter(candidateList.legislative.principals, function(_) { return _.partyId === partyId })[0])
    candidateListByPartyId.legislative.list         = cloneDeep(filter(candidateList.legislative.list, function(_) { return _.partyId === partyId }))
    candidateListByPartyId.legislative.nominal      = cloneDeep(filter(candidateList.legislative.nominal, function(_) { return _.partyId === partyId }))
    // Municipal
    candidateListByPartyId.municipal.principal     = cloneDeep(filter(candidateList.municipal.principals, function(_) { return _.partyId === partyId })[0])
    candidateListByPartyId.municipal.list           = cloneDeep(filter(candidateList.municipal.list, function(_) { return _.partyId === partyId }))
    candidateListByPartyId.municipal.nominal        = cloneDeep(filter(candidateList.municipal.nominal, function(_) { return _.partyId === partyId }))
    
    return candidateListByPartyId

}