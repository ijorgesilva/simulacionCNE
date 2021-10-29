import { useCurrentPeriod } from './useCurrentPeriod'
import Helper from '../utils/utils'
import { set } from 'lodash'

export const useCreateInitialBallot = (
        party,
        governor,
        list,
        nominal,
        mayor,
        municipalList,
        municipalNominal,
    ) => { 

    const currentPeriod = useCurrentPeriod()
    
    let initialBallot = {
        legislative: {
            principal: governor?.length ? set(governor[0],'party', party[0].partidoDetails) : { status: 'unset' },
            list: [],
            nominal: [],
        },
        municipal: {
            principal: mayor?.length ? set(mayor[0],'party', party[0].partidoDetails) : { status: 'unset' },
            list: [],
            nominal: [],
        }
    }
    let tempList = []
    let emptyObj = { status: 'unset' }

    // TODO: DRY 
    // Legislative List
    if ( list ) {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoLegislativeList; i++) {
            tempList.push(list[i] ? list[i] : emptyObj )
            if( tempList[i].id !== 0 ) {
                tempList[i] = Helper.addToObject(tempList[i], 'party', party[0].partidoDetails)
            }
        }
    }
    else {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoLegislativeList; i++) {
            tempList.push( emptyObj )
        }
    }
    initialBallot.legislative.list = tempList
    tempList = []

    // Legislative Nominal
    if ( nominal ) {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoLegislativeNominal; i++) {
            tempList.push(nominal[i] ? nominal[i] : emptyObj )
            if( tempList[i].id !== 0 ) {
                tempList[i] = Helper.addToObject(tempList[i], 'party', party[0].partidoDetails)
            }
        }
    }
    else {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoLegislativeNominal; i++) {
            tempList.push( emptyObj )
        }
    }
    initialBallot.legislative.nominal = tempList
    tempList = []

    // Municipal List
    if ( municipalList ) {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoMunicipalList; i++) {
            tempList.push(municipalList[i] ? municipalList[i] : emptyObj )
            if( tempList[i].id !== 0 ) {
                tempList[i] = Helper.addToObject(tempList[i], 'party', party[0].partidoDetails)
            }
        }
    }
    else {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoMunicipalList; i++) {
            tempList.push( emptyObj )
        }
    }
    initialBallot.municipal.list = tempList
    tempList = []

    // Municipal Nominal
    if ( municipalNominal ) {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoMunicipalNominal; i++) {
            tempList.push(municipalNominal[i] ? municipalNominal[i] : emptyObj )
            if( tempList[i].id !== 0 ) {
                tempList[i] = Helper.addToObject(tempList[i], 'party', party[0].partidoDetails)
            }
        }
    }
    else {
        for (let i = 0; i < currentPeriod.periodoDetails.periodoMunicipalNominal; i++) {
            tempList.push( emptyObj )
        }
    }
    initialBallot.municipal.nominal = tempList
    tempList = []

    return initialBallot

}