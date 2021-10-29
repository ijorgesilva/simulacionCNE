import React from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../blurb'

import './candidates.scss'

export default function Candidates ( 
    { 
        items,
        cardStyle,
        candidateTarget,
        modifyCandidate,
    } 
) {
    // console.log('candidateTarget')
    // console.log(candidateTarget)
    return (
        <main className = 'candidates'>
            <Container fluid className = 'respect-aspect-ratio'>
                {
                    items?.length > 0 ?
                        items.map ( (_, index) => (
                            <CandidateCard 
                                key             = { index }
                                className       = '' 
                                status          = 'publish'
                                // Candidate
                                name            = { _.candidatoDetails.candidatoName }
                                photo           = { _.candidatoDetails.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                // Party
                                title           = { _.party?.partidoTitle }
                                overlayColor    = { _.party?.partidoColor }
                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                layoutType      = { cardStyle ? cardStyle : 'principal' }
                                onClick         = { modifyCandidate( _, candidateTarget, index ) }
                            />
                        ))
                    :
                        undefined
                }
            </Container>
        </main>
    )
}