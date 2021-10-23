import React from 'react'
import { Link } from 'gatsby'
import { Container, Alert, Button } from 'react-bootstrap'
import  { 
  faScroll,
  faRedo,
  faEnvelope, 
  faShareSquare
} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton } from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import config from '../../../data/SiteConfig'
import Header from '../../components/header'
import { useCurrentPeriod } from '../../hooks/useCurrentPeriod'
import '../../components/app.scss'
import './success.scss'

export default function SuccessPage ( { location } ) {

    const messageShare = 'Revisa el simulador de votación para las elecciones.'
    const currentPeriodTitle = useCurrentPeriod().periodoDetails.periodoTitle
    const canonicalUrl = config.siteUrl + location.pathname

    return (
      <>
  
        <Header
            title         = { '¡Éxito!' } 
            periodoTitle  = { currentPeriodTitle }
            location      = { location } 
            description   = { '' }
            article       = { false }
            metaTags      =   {{
                                  noIndex: false,
                              }}
            showBar
        />
  
        <Container fluid className = 'main successPage'>

          <div className = 'message container-sm'>

            <FontAwesomeIcon className='icon' icon={faScroll} size='lg'/> 
            <h1 className = 'success'>¡Usted ha finalizado con éxito!</h1>
            <p>Tome su comprobante y  y depositelo en la caja de resguardo.</p>

            <Alert variant='success' className = 'share' >
              <Alert.Heading>Comparte el simulador</Alert.Heading>
              <p>
                Comparte el simulador e invita a otros a como ejercer su voto.
              </p>
              <hr />
              <p className='icons mb-0'>
                    <FacebookShareButton 
                        className="user-select-none"
                        quote="" 
                        hashtag="" 
                        url={canonicalUrl} 
                    >
                        <FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook
                    </FacebookShareButton>
                    <WhatsappShareButton 
                        className="user-select-none"
                        title={ messageShare }
                        url={canonicalUrl} 
                    >
                         <FontAwesomeIcon icon={faWhatsapp} size="lg" /> Whatsapp
                    </WhatsappShareButton>
                    <TwitterShareButton 
                        className="user-select-none"
                        url={canonicalUrl} 
                        title=""
                    >
                        <FontAwesomeIcon icon={faTwitter} size="lg" /> Twitter
                    </TwitterShareButton>
                    <EmailShareButton 
                        className="user-select-none"
                        title={ messageShare }
                    >
                         <FontAwesomeIcon icon={faEnvelope} size="lg" /> Email
                    </EmailShareButton>
              </p>
            </Alert>

            <Button 
              as      = { Link } 
              to      = { '/' }
              variant = 'outline-secondary'
            >
              <FontAwesomeIcon className='icon' icon={faRedo} size='lg'/> Comenzar de nuevo
            </Button>

          </div>

        </Container>
  
      </>
    )
}
