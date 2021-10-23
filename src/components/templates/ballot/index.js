import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'

import Header from '../../header'
import Ballot from '../../ballot'
import Footer from '../../footer'

import '../../app.scss'

export default function indexPage ( { location, data, pageContext } ) {

  const { periodTitle } = pageContext
  const { ballot } = data
  
  return (
    <>

      <Header
          title         = { periodTitle } 
          periodoTitle  = { periodTitle }
          location      = { location } 
          description   = { '' }
          article       = { false }
          metaTags      =   {{
                                noIndex: false,
                            }}
          showBar
          noticeText    = { 'Presione sobre el candidato que desee cambiar. Cuando termine presione el botón “SIGUIENTE”.' }
      />

      <Container fluid className = 'main ballotPage'>

        <Ballot 
          className           = {''}
          party               = { ballot.papeletaDetails.papeletaPartidoPartido }
          
          governor            = { ballot.papeletaDetails.papeletaPartidoGobernador }
          list                = { ballot.papeletaDetails.papeletaPartidoLista }
          nominal             = { ballot.papeletaDetails.papeletaPartidoNominal }

          mayor               = { ballot.papeletaDetails.papeletaPartidoAlcalde }
          municipalList       = { ballot.papeletaDetails.papeletaPartidoCmLista}
          municipalNominal    = { ballot.papeletaDetails.papeletaPartidoCmNominal}
        />

      </Container>

      <Footer
        before        = '/'
        buttonUrl     = '/success'
        buttonText    = 'Siguiente'
        buttonVariant = 'primary'
        tour          = 'test'
      />

    </>
  )
}

export const query = graphql`
  query listBallot ( $slug: String! ) {
    ballot: wpPosicion(
        slug: {
          eq: $slug
        }
    ) {
      papeletaDetails {

        ## General
        papeletaPartidoPartido {
          ... on WpPartido {
            id
            partidoDetails {
              partidoTitle
              partidoColor
              partidoLogo {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }

        ## Governors and State Legislative Council 
        papeletaPartidoGobernador {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
        papeletaPartidoLista {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
        papeletaPartidoNominal {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }

        ## Mayor and Municipal Council 
        papeletaPartidoAlcalde {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
        papeletaPartidoCmLista {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
        papeletaPartidoCmNominal {
          ... on WpCandidato {
            id
            candidatoDetails {
              candidatoName
              candidatoPhoto {
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
`