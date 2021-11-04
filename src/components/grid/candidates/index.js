import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../../blurb'
import Footer from '../../footer'
import { reduce } from 'lodash'

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
    } 
) {
    let candidatesByParty = {}
    let partyList = []
    let partyKeys = []

    if (preFilterByParty) {
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
        // console.log('Party list')
        // console.log(partyList)
    } else {
        partyList = items
        // console.log('CandidateList')
        // console.log(partyList)
    }

    const [ listState, setListState ] = useState( partyList )
    
    const showCandidates = ( candidates ) => () => {
        setListState(candidates)
    }

    return (
        <>

            <main className = 'candidates'>
                <Container fluid className = ''>
                    {
                        preFilterByParty ?
                            <>
                            {
                                listState[0].candidates ? // Checks if Party View first
                                    listState?.map ( ( _, index ) => (
                                        _.candidates ?
                                            <CandidateCard 
                                                key             = { index }
                                                className       = '' 
                                                contextClass    = { contextClass ? contextClass : 'swap' }
                                                status          = 'publish'
                                                title           = { _.party?.partidoTitle }
                                                replaceTitle    = { _.partyId  }//replaceTitle
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = { cardStyle ? cardStyle : 'principal' }
                                                onClick         = { showCandidates( _.candidates) }
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
                                            className       = '' 
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
                                        className       = '' 
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
                            :
                                <span>No hay más candidatos disponibles. Anule un voto para regresar el candidato a esta lista.</span>
                    }
                </Container>
            </main>

            <Footer
                indexClicked    = { indexClicked }
                candidateTarget = { candidateTarget }
                voidCandidate   = { voidCandidate }
            />

        </>
    )
}