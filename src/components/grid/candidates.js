import React from 'react'
import { Container } from 'react-bootstrap'
import { CandidateCard } from '../blurb'

import './candidates.scss'

export default function Candidates ( 
    { 
        items,
        cardStyle,
        indexClicked,
        candidateTarget,
        modifyCandidate,
        contextClass,
    } 
) {
    
    return (
        <main className = 'candidates'>
            <Container fluid className = ''>
                {
                    items?.length > 0 ?
                        items.map ( (_, index) => (
                            <CandidateCard 
                                key             = { index }
                                className       = '' 
                                contextClass    = 'swap'
                                status          = 'publish'
                                // Candidate
                                name            = { _.candidatoDetails?.candidatoName }
                                photo           = { _.candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                // Party
                                title           = { _.party?.partidoTitle }
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
    )
}