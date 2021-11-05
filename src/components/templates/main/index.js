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
          title: '¡BIENVENIDO AL SIMULADOR REGIONALES 2021!',
          text: `
            <p>Aquí podrás practicar las diferentes formas de ejercer tu derecho al voto en las próximas elecciones del <strong><em>21 de noviembre de 2021.</em></strong></p>
            <p>Recuerda que esta es una simulación para conocer el uso de la máquina y algunos detalles pueden ser diferentes en la máquina real cuando estés ejerciendo tu derecho al voto.</p>
          `,
          graphic: undefined,
        },
        {
          title: 'SELECCIONA EL PARTIDO DE TU PREFERENCIA',
          text: `
            <p>La máquina de votación te pedirá elegir el partido de tu preferencia.</p>
            <p>Al elegir el partido, automáticamente se seleccionarán todos los candidatos que representen el partido seleccionado.</p>
          `,
          graphic: undefined,
        },
        {
          title: 'VOTAR POR DIFERENTES PARTIDOS O CANDIDATOS',
          text: `
            <p>Luego de haber elegido el partido de tu preferencia principal, selecciona el cargo específico que deseas cambiar, y luego selecciona un nuevo partido o candidato.</p>
            <p>Esto deberás hacerlo con cada uno de los cargos donde deseas cambiar el partido o el candidato de tu preferencia.</p>
          `,
          graphic: undefined,
        },
        {
          title: 'VOTO NULO',
          text: `
            <p>Luego de elegir el partido de tu preferencia principal, si no deseas votar por uno o varios de los cargos de elección, selecciona el cargo que no deseas darle tu voto y luego en la parte inferior izquierda de la pantalla, haz clic en el botón de “Sin seleccionar”. </p>
            <p>Esto deberás hacerlo con cada uno de los cargos donde deseas anular tu voto, o esperar que transcurran los 3 minutos habilitados que tienes para votar sin haber seleccionado ningún partido previamente.</p>
          `,
          graphic: undefined,
        },
        {
          title: 'BOTONES DE VOLVER',
          text: `
            <p>En la barra inferior de la pantalla, cuando sea posible, aparecerán dos botones donde podrás regresar a la vista anterior o retornar a la vista donde te encontrabas previamente.</p>
          `,
          graphic: undefined,
        }
      ]
  }

  // Cleans Party Selection if PartyCard is pressed again
  const clearLocalStorage = ( partyId ) => () => {
    localStorage.setItem(`candidates-${partyId}`, '')
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
          items           = { listParties.nodes }
          onClickAction   = { clearLocalStorage }
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
                    databaseId
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