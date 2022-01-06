import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../header'
import Footer from '../../footer'

import '../app.scss'

export default function NoPeriodSelected ( { location, pageContext } ) {

    const content = {
        textFooter: '-',
        description: 'No hay periodos disponibles',
    }

    return (
    <>

      <Header
          title         = { title } 
          periodoTitle  = { title }
          location      = { location } 
          description   = { content.description }
          article       = { false }
          metaTags      =   {{
                                noIndex: false,
                            }}
          showBar
          noticeText    = { content.noticeText }
      />

      <Container fluid className = 'main indexPage'>

        {content.description}

      </Container>

      <Footer
        textCenter      = { content.textFooter }
        onboard         = { onBoardTour }
        next
      />

    </>
  )
}
