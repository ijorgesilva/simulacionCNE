import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'

import Confirmation from '../../confirmation'
import Header from '../../header'
import Ballot from '../../ballot'
import Footer from '../../footer'

import { useFirstRender } from '../../../hooks/useFirstRender'
import { useCreateInitialBallot } from '../../../hooks/useCreateInitialBallot'
import { checkCandidatesStatus } from '../../../hooks/checkCandidatesStatus'
import '../../app.scss'

const steps = [
  {
    selector: '.headerBar',
    content: 'This is my first Step',
  },
]

export default function IndexPage ( { location, data, pageContext } ) {

  const { periodTitle } = pageContext
  const firstRender = useFirstRender()

  const initialBallot = useCreateInitialBallot(
      data.ballot.papeletaDetails.papeletaPartidoPartido,
      data.ballot.papeletaDetails.papeletaPartidoGobernador,
      data.ballot.papeletaDetails.papeletaPartidoLista,
      data.ballot.papeletaDetails.papeletaPartidoNominal,
      data.ballot.papeletaDetails.papeletaPartidoAlcalde,
      data.ballot.papeletaDetails.papeletaPartidoCmLista,
      data.ballot.papeletaDetails.papeletaPartidoCmNominal,
  )
  const [ confirmation, setConfirmation ] = useState(checkCandidatesStatus(initialBallot))
  const [ candidatesSelection, setCandidatesSelection ] = useState('')
  
  const [ show, setShow ] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  useEffect(() => {
    if ( !firstRender ) {
      if ( !checkCandidatesStatus(candidatesSelection) ) {
        setConfirmation(false)
      }
    }
  })

  const voteNow = () => () => {
    if ( confirmation ) {
      handleShow()
    }
    else {
      setConfirmation(false)
    }
  }

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
          noticeText    = { 'REVISE SUS OPCIONES Y PRESIONE EL BOTÓN "VOTAR"' }
      />

      <Container fluid className = 'main ballotPage'>

        <Ballot 
          className                 = {''}
          location                  = { location }
          initialBallot             = { initialBallot }
        />

      </Container>

      <Confirmation 
        onHide        = { handleClose}
        show          = { show }
        buttonUrl     = '/success'
        buttonText    = 'Votar'
      />

      <Footer
        before        = '/'
        buttonOnClick = { voteNow }
        buttonText    = { 'Votar' }
        buttonUrl     = { confirmation ? undefined : '/success' }

        buttonVariant = 'outline-dark'
        // tour          = {{
        //                     steps: '',
        //                 }}
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

        ## Governors and State Legislative Council 
        papeletaPartidoGobernador {
          ... on WpCandidato {
            id
            status
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
            status
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
            status
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
            status
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
            status
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
            status
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