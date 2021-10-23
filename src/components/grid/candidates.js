import React from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../blurb'

import './candidates.scss'

export default function Candidates ( 
    { 
        items,
        onClick,
        onHide,
        cardStyle,
    } 
) {
    return (
        <main className = 'candidates'>
            <Container fluid className = 'respect-aspect-ratio'>
                {
                    items?.length > 0 ?
                        items.map ( (_, index) => (
                            <CandidateCard 
                                className       = '' 
                                // Candidate
                                name            = { _.candidatoDetails.candidatoName }
                                photo           = { _.candidatoDetails.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                // Party
                                title           = { _.party?.partidoTitle }
                                overlayColor    = { _.party?.partidoColor }
                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                layoutType      = { cardStyle ? cardStyle : 'principal' }
                            />
                        ))
                    :
                        undefined
                }
            </Container>
        </main>
    )
}