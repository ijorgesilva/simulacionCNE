import { includes } from 'lodash'

export const checkCandidatesStatus = ( candidates ) => { 

    let confirmation = false
    
    // Check if empty candidates
    // Legislative
    if(includes( candidates.legislative.principal , 'unset' ) === true ) {
        confirmation = true
    }
    if ( candidates.legislative.list ){
        candidates.legislative.list.forEach( (_, index) => {
            if(includes( _ , 'unset' ) === true ) {
                confirmation = true
            }
        })
    }
    if ( candidates.legislative.nominal ){
        candidates.legislative.nominal.forEach( (_, index) => {
            if(includes( _ , 'unset' ) === true ) {
                confirmation = true
            }
        })
    }
    // Legislative
    if(includes( candidates.municipal.principal , 'unset' ) === true ) {
        confirmation = true
    }
    if ( candidates.municipal.list ){
        candidates.municipal.list.forEach( (_, index) => {
            if(includes( _ , 'unset' ) === true ) {
                confirmation = true
            }
        })
    }
    if ( candidates.municipal.nominal ){
        candidates.municipal.nominal.forEach( (_, index) => {
            if(includes( _ , 'unset' ) === true ) {
                confirmation = true
            }
        })
    }

    return confirmation

}