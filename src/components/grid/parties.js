import React from 'react'
import { Container } from 'react-bootstrap'
import { PartyCard } from '../blurb'

import './parties.scss'

export default function Parties ( 
    { 
        items,
        onClickAction,
    } 
) {
    return (
        <main className = 'parties'>
            <Container fluid className = ''>
                {
                    items?.length > 0 ?
                        items.map ( (_, index) => (
                            <PartyCard 
                                key             = { index }
                                className       = '' 
                                url             = { `/${_.databaseId}` }
                                // Partido
                                partyId         = { _.papeletaDetails.papeletaPartidoPartido[0]?.databaseId }
                                title           = { _.papeletaDetails.papeletaPartidoPartido[0]?.partidoDetails.partidoTitle }
                                logo            = { _.papeletaDetails.papeletaPartidoPartido[0]?.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                poster          = { _.papeletaDetails.papeletaPartidoPartido[0]?.partidoDetails.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                overlayColor    = { _.papeletaDetails.papeletaPartidoPartido[0]?.partidoDetails.partidoColor }
                                onClickAction   = { onClickAction }
                                // General
                                column          = { _.papeletaDetails.papeletaPartidoPosicionColumna }
                                row             = { _.papeletaDetails.papeletaPartidoPosicionFila }
                                style           =  {
                                                        { 
                                                            gridArea: `c${_.papeletaDetails.papeletaPartidoPosicionColumna}x${_.papeletaDetails.papeletaPartidoPosicionFila}`,
                                                        }
                                                    }
                            />
                        ))
                    :
                        undefined
                }
            </Container>
        </main>
    )
}