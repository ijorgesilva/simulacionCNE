import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'

import Header from '../../header'
import { Parties } from '../../grid'
import Footer from '../../footer'

import '../../app.scss'

export default function indexPage ( { location, data, pageContext } ) {

  const { title, periodSlug } = pageContext
  const { listParties } = data
  
  return (
    <>

      <Header
          title         = { title } 
          periodoTitle  = { title }
          location      = { location } 
          description   = { 'Resumen de la pagina' }
          article       = { false }
          metaTags      =   {{
                                noIndex: false,
                            }}
          showBar
      />

      <Container fluid className = 'main indexPage'>

        <Parties 
          items       = { listParties.nodes }
          periodSlug  = { periodSlug }
        />

      </Container>

      <Footer
        textCenter      = 'Centro #140921920. Mesa #8'
        onboard         = 'test'
      />

    </>
  )
}

export const query = graphql`
    query listParties ( $periodoId: String! ) {
        listParties: allWpPosicion (
            filter: {
              papeletaDetails: {
                papeletaPeriodoId: {
                  regex: $periodoId
                }
              },
              status: {
                  eq: "publish"
              }, 
            }
            limit: 49
        ) {
            nodes {
              papeletaDetails {
                papeletaPartidoPosicionColumna
                papeletaPartidoPosicionFila
                papeletaPartidoPartido {
                  ... on WpPartido {
                    id
                    slug
                    status
                    partidoDetails {
                      partidoColor
                      partidoTitle
                      partidoLogo {
                        localFile {
                          childImageSharp {
                            gatsbyImageData
                          }
                        }
                      }
                      partidoPoster {
                        localFile {
                          childImageSharp {
                            gatsbyImageData
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        }
    }
`