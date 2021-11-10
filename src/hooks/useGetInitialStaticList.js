import { useGetCandidates } from './useGetCandidates'

export const useGetInitialStaticList = ( initialBallot ) => {

    const candidateList = Object.assign({}, useGetCandidates()) // All Candidates
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
    // Legislative
        // Principal
        filteredList.legislative.principals = candidateList.legislative.principals
        // List
        filteredList.legislative.list = candidateList.legislative.list
        // Nominal
        filteredList.legislative.nominal = candidateList.legislative.nominal
    // Municipal
        // Principal
        filteredList.municipal.principals = candidateList.municipal.principals
        // List
        filteredList.municipal.list = candidateList.municipal.list
        // Nominal
        filteredList.municipal.nominal = candidateList.municipal.nominal
        
    return filteredList
    
}