import { remove, differenceBy } from 'lodash'
import { useGetCandidates } from './useGetCandidates'

export const useGetInitialSwapList = ( initialBallot ) => {

    const candidateList = Object.assign({}, useGetCandidates()) // All Candidates
    let tempArray = []
    let filteredList = {
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
    let tempList
    // Legislative
        // Principal
        tempArray.push(initialBallot.legislative.principal)
        filteredList.legislative.principals = differenceBy(candidateList.legislative.principals, tempArray, 'id')
        tempArray = []
        // List
        filteredList.legislative.list = differenceBy(candidateList.legislative.list, initialBallot.legislative.list, 'id')
        // Nominal
        filteredList.legislative.nominal = differenceBy(candidateList.legislative.nominal, initialBallot.legislative.nominal, 'id')
    // Municipal
        // Principal
        tempArray.push(initialBallot.municipal.principal)
        filteredList.municipal.principals = differenceBy(candidateList.municipal.principals, tempArray, 'id')
        tempArray = []
        // List
        filteredList.municipal.list = differenceBy(candidateList.municipal.list, initialBallot.municipal.list, 'id')
        // Nominal
        filteredList.municipal.nominal = differenceBy(candidateList.municipal.nominal, initialBallot.municipal.nominal, 'id')
        
    return filteredList
    
}