import { remove, filter } from 'lodash'

export const swapListRemoveCandidate = (  candidatesSelection, route, replacement, sourceId ) => {

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
    // Legislative
        // Principal
        if( route === 'legislative.principal' ) {
            tempArray.push(candidatesSelection.legislative.principal)
            filteredList.legislative.principals = filter( tempArray, function(o) { return o.id !== replacement.id; })
        }
        // List
        if( route === 'legislative.list' ) {
            filteredList.legislative.list = filter( candidatesSelection.legislative.list, function(o) { return o.id !== replacement.id; })
        }
        // Nominal
        if( route === 'legislative.nominal' ) {
            filteredList.legislative.nominal = filter( candidatesSelection.legislative.nominal, function(o) { return o.id !== replacement.id; })
        }

    // Municipal
        // Principal
        if( route === 'municipal.principal' ) {
            tempArray.push(candidatesSelection.municipal.principal)
            filteredList.municipal.principals = filter( tempArray, function(o) { return o.id !== replacement.id; })
        }
        // List
        if( route === 'municipal.list' ) {
            filteredList.municipal.list = filter( candidatesSelection.municipal.list, function(o) { return o.id !== replacement.id; })
        }
        // Nominal
        if( route === 'municipal.nominal' ) {
            filteredList.municipal.nominal = filter( candidatesSelection.municipal.nominal, function(o) { return o.id !== replacement.id; })
        }

    return filteredList
    
}