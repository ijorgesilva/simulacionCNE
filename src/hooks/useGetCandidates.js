import { useGetBallots } from './useGetBallots'
import { useCurrentPeriod } from './useCurrentPeriod'

export const useGetCandidates = () => { 

    const currentPeriodId = useCurrentPeriod()
    const allBallots = useGetBallots()

    const filteredByPeriod = allBallots.nodes.filter( 
                                _ => (_.papeletaDetails.papeletaPartidoPeriodo[0].databaseId === currentPeriodId.databaseId)
                             );

    let candidateList = {
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
    let tempParty = []

    filteredByPeriod.forEach( ( ballot, index) => {
        // TODO: DRY
        tempParty[index] = ballot.papeletaDetails.papeletaPartidoPartido[0].partidoDetails
        ballot.papeletaDetails.papeletaPartidoGobernador?.forEach( ( candidate, i ) => {
            candidateList.legislative.principals.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
        ballot.papeletaDetails.papeletaPartidoLista?.forEach( ( candidate, i ) => {
            candidateList.legislative.list.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
        ballot.papeletaDetails.papeletaPartidoNominal?.forEach( ( candidate, i ) => {
            candidateList.legislative.nominal.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
        ballot.papeletaDetails.papeletaPartidoAlcalde?.forEach( ( candidate, i ) => {
            candidateList.municipal.principals.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
        ballot.papeletaDetails.papeletaPartidoCmLista?.forEach( ( candidate, i ) => {
            candidateList.municipal.list.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
        ballot.papeletaDetails.papeletaPartidoCmNominal?.forEach( ( candidate, i ) => {
            candidateList.municipal.nominal.push( Object.assign(candidate, {party: tempParty[index]}) )
        })
    });

    return candidateList

}