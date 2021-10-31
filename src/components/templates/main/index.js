import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'

import Header from '../../header'
import { Parties } from '../../grid'
import Footer from '../../footer'

import '../../app.scss'

export default function IndexPage ( { location, data, pageContext } ) {

  const { title, periodSlug } = pageContext
  const { listParties } = data

  const [ onBoard, setOnBoard ] = useState(false)
  
  // Check if it is the first simulation 
  useEffect( () => {
    if ( localStorage.getItem('onBoard') === null ) {
      modifyOnBoard(true)()
    }
  })

  const modifyOnBoard = ( status ) => () => {
    if (status === true ){
      setOnBoard(true)
      localStorage.setItem('onBoard', 'false')
    }
    if (status === false ){
      setOnBoard(false)
      localStorage.setItem('onBoard', 'false')
    }
  }

  const content = {
    textFooter: 'Centro #140921920. Mesa #8',
    noticeText: 'Seleccione el partido por el cual desea votar',
  }

  const onBoardTour = { 
    title: 'Bienvenido al Simulador del Voto',
    className: '',
    onClick: modifyOnBoard(true), 
    show: onBoard,
    onHide: modifyOnBoard(false),
    content: {
      linkTitle: 'Ayuda'
    },
    slides: [
        {
          title: 'Slide 1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          graphic: undefined,
        },
        {
          title: 'Slide 2',
          text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          graphic: undefined,
        },
        {
          title: 'Slide 3',
          text: 'Convallis posuere morbi leo urna. Velit sed ullamcorper morbi tincidunt ornare. Blandit libero volutpat sed cras. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Erat imperdiet sed euismod nisi porta lorem mollis. Condimentum vitae sapien pellentesque habitant morbi tristique.',
          graphic: undefined,
        }
      ]
  }

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
          noticeText    = { content.noticeText }
      />

      <Container fluid className = 'main indexPage'>

        <Parties 
          items       = { listParties.nodes }
          periodSlug  = { periodSlug }
        />

      </Container>

      <Footer
        textCenter      = { content.textFooter }
        onboard         = { onBoardTour }
        next
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
              databaseId
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