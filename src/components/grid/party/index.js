import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../../blurb'
import Footer from '../../footer'
import { reduce } from 'lodash'

import Helper from '../../../utils/utils'
import './party.scss'

export default function Candidates ( 
    { 
        contextClass,
        cardStyle,
        swapCandidate,
        fullCandidateList,
        // Swap Party Only
        swapPartyCandidates,
        swapPartyOnly,
        replacingSide,
    } 
) {
    let parties = {}
    let partyList = []
    let partyKeys = []
    
    if( fullCandidateList ) {
        if( swapCandidate ) {
            parties = reduce( fullCandidateList, function(result, currentObject, index) {
                (result[currentObject.partyId] || (result[currentObject.partyId] = [])).push(currentObject);
                return result;
            }, {})
            partyKeys = Object.keys(parties)
            partyKeys.forEach ( (key, i) => {
                partyList.push( { candidates: parties[key], party: parties[key][0].party, partyId: parties[key][0].partyId } )
            })
        }
        // TODO: When Swapping candidates is off
    } 

    function getPartyPosition ( partyId ) {
        return localStorage.getItem(`party-${partyId}`)
    }

    return (
        <>
            <main className = 'candidates party'>
                <Container 
                    style = { { 
                        minHeight: `calc( 100vh - 45px - 60px - 90px - 6rem )`
                    } } 
                    fluid 
                >
                    {
                        partyList?.map ( ( _, index ) => (
                            <CandidateCard 
                                // Styling
                                key             = { index }
                                className       = { `party` }
                                contextClass    = { contextClass ? contextClass : 'swap' }
                                layoutType      = { cardStyle ? cardStyle : 'list' }
                                status          = 'publish'
                                style           =  {
                                                        { 
                                                            gridArea: `${getPartyPosition(_.partyId)}`,
                                                        }
                                                    }
                                // Party
                                title           = { _.party?.partidoTitle }
                                overlayColor    = { _.party?.partidoColor }
                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                // Actions
                                onClick         = { swapPartyCandidates( _.partyId, replacingSide ) }
                            />
                        ))
                    }
                </Container>
            </main>

            <Footer />
        </>
    )
}