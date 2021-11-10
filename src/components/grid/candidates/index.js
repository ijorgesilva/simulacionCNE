import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../../blurb'
import Footer from '../../footer'
import { reduce } from 'lodash'

import Helper from '../../../utils/utils'
import './candidates.scss'

export default function Candidates ( 
    { 
        items,
        cardStyle,
        indexClicked,
        candidateTarget,
        modifyCandidate,
        contextClass,
        replaceTitle,
        voidCandidate,
        preFilterByParty,
        fullCandidateList,
        swapCandidate,
    } 
) {
    let candidatesByParty = {}
    let partyList = []
    let partyKeys = []

    const [ containerMode, setContainerMode ] = useState(false)

    if (preFilterByParty) {

        if( swapCandidate && fullCandidateList?.length > 0 ) {
            candidatesByParty = reduce( fullCandidateList, function(result, currentObject, index) {
                (result[currentObject.partyId] || (result[currentObject.partyId] = [])).push(currentObject);
                return result;
            }, {})
            partyKeys = Object.keys(candidatesByParty)
            partyKeys.forEach ( (key, i) => {
                partyList.push( { candidates: candidatesByParty[key], party: candidatesByParty[key][0].party, partyId: candidatesByParty[key][0].partyId } )
            })
        } else {
            // Ordered list by Party
            candidatesByParty = reduce( items, function(result, currentObject, index) {
                (result[currentObject.partyId] || (result[currentObject.partyId] = [])).push(currentObject);
                return result;
            }, {})
            // Party List
            partyKeys = Object.keys(candidatesByParty)
            partyKeys.forEach ( (key, i) => {
                partyList.push( { candidates: candidatesByParty[key], party: candidatesByParty[key][0].party, partyId: candidatesByParty[key][0].partyId } )
            })
        }
    } else {
        if( swapCandidate && fullCandidateList?.length > 0 ) {
            partyList = fullCandidateList
        }
        else {
            partyList = items
        }
    }

    const [ listState, setListState ] = useState( partyList )
    const [ rows, setRows ] = useState( Helper.calculateGridRows(listState.length) )
    
    const showCandidates = ( candidates ) => () => {
        setListState(candidates)
        setRows( Helper.calculateGridRows( candidates.length ) )
        setContainerMode(true)
    }

    function getPartyPosition ( partyId ) {
        return localStorage.getItem(`party-${partyId}`)
    }

    return (
        <>

            <main className = 'candidates'>
                <Container 
                    // Fixed Height of Rows on Grid
                    // style = { { 
                    //     gridTemplateRows: `repeat( ${ rows }, minmax( calc( ( 100vh - 45px - 60px - 90px - 6rem ) / ${ rows } ), 1fr ) )`
                    // } } 
                    style = { { 
                        minHeight: `calc( 100vh - 45px - 60px - 90px - 6rem )`
                    } } 
                    className = {`${ listState[0].id && containerMode ? 'flexCenter' : '' }`} // Change display mode to flex if Nominal candidates
                    fluid 
                >
                    {
                        preFilterByParty ?
                            <>
                            {
                                listState[0].candidates ? // Checks if Party View first
                                    listState?.map ( ( _, index ) => (
                                        _.candidates ?
                                            <CandidateCard 
                                                key             = { index }
                                                className       = { `party` }
                                                contextClass    = { contextClass ? contextClass : 'swap' }
                                                status          = 'publish'
                                                title           = { _.party?.partidoTitle }
                                                replaceTitle    = { replaceTitle  }
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = { cardStyle ? cardStyle : 'principal' }
                                                onClick         = { showCandidates( _.candidates) }
                                                style           =  {
                                                                        { 
                                                                            gridArea: `${getPartyPosition(_.partyId)}`,
                                                                        }
                                                                    }
                                            />
                                        :
                                            undefined
                                    ))
                                : undefined
                            }
                            {
                                listState[0].id ? // Print candidates when Party List have been set
                                    listState.map ( ( _, index ) => ( 
                                        <CandidateCard 
                                            key             = { index }
                                            className       = { `` }
                                            contextClass    = { contextClass ? contextClass : 'swap' }
                                            status          = 'publish'
                                            // Candidate
                                            name            = { _.candidatoDetails?.candidatoName }
                                            photo           = { _.candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                            // Party
                                            title           = { _.party?.partidoTitle }
                                            replaceTitle    = { replaceTitle }
                                            overlayColor    = { _.party?.partidoColor }
                                            logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                            poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                            layoutType      = { cardStyle ? cardStyle : 'principal' }
                                            onClick         = { modifyCandidate( _, candidateTarget, indexClicked, _.id ) }
                                        />
                                    ))
                                : undefined
                            }
                            </>
                        :
                            listState?.length > 0 ?
                                listState.map ( (_, index) => (
                                    <CandidateCard 
                                        key             = { index }
                                        className       = { `` }
                                        contextClass    = { contextClass ? contextClass : 'swap' }
                                        status          = 'publish'
                                        // Candidate
                                        name            = { _.candidatoDetails?.candidatoName }
                                        photo           = { _.candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                        // Party
                                        title           = { _.party?.partidoTitle }
                                        replaceTitle    = { replaceTitle }
                                        overlayColor    = { _.party?.partidoColor }
                                        logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                        poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                        layoutType      = { cardStyle ? cardStyle : 'principal' }
                                        onClick         = { modifyCandidate( _, candidateTarget, indexClicked, _.id ) }
                                        style           =  {
                                                                { 
                                                                    gridArea: `${getPartyPosition(_.partyId)}`,
                                                                }
                                                            }
                                    />
                                ))
                            :
                                <span>No hay más candidatos disponibles. Anule un voto para regresar el candidato a esta lista.</span>
                    }
                </Container>
            </main>

            <Footer
                indexClicked    = { indexClicked }
                candidateTarget = { candidateTarget }
                voidCandidate   = { voidCandidate }
                voidVisibility  = { listState[0].candidates ? false : true }
            />

        </>
    )
}