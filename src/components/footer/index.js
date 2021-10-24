import React from 'react'
import { Link } from 'gatsby'
import { Container, Button } from 'react-bootstrap'
import  { 
            faQuestionCircle,
            faArrowAltCircleLeft,
            faArrowAltCircleRight
        } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Tour from '../tour'
import OnBoard from '../onboard'
import './footer.scss'

export default function Footer ( {
    before,
    next,
    textCenter,
    buttonUrl,
    buttonText,
    buttonVariant,
    tour,
    onboard,
} ) {
    
    return (
        <>
            <footer className = 'footer pt-3 pb-3'>
                <Container fluid>
                    <div className = 'left'>
                        {
                            before ?
                                <Button 
                                    as          = { Link }
                                    variant     = 'none'
                                    className   = 'before' 
                                    to          = { before } 
                                    title       = 'Anterior'
                                >
                                    <FontAwesomeIcon className='icon' icon={faArrowAltCircleLeft} size='lg'/>
                                </Button>
                            : undefined
                        }
                        {
                            tour ?
                                <Button 
                                    variant     = 'none'
                                    className   = 'help onboard' 
                                    // onClick     = { onboard.onClick }
                                    // title       = { onboard.content.linkTitle }
                                >
                                    <FontAwesomeIcon className='icon' icon={faQuestionCircle} size='lg'/>
                                </Button>
                            : undefined
                        }
                        {
                            onboard?.onClick ?
                                <Button 
                                    variant     = 'none'
                                    className   = 'help onboard' 
                                    onClick     = { onboard.onClick }
                                    title       = { onboard.content.linkTitle }
                                >
                                    <FontAwesomeIcon className='icon' icon={faQuestionCircle} size='lg'/>
                                </Button>
                            : undefined
                        }
                    </div>

                    <div className = 'center text-center'>
                        {
                            buttonUrl && buttonText ?
                                <Button 
                                    as      = { Link } 
                                    to      = { buttonUrl }
                                    variant = { buttonVariant ? buttonVariant : 'primary' }
                                    size    = 'lg'
                                >
                                    { buttonText }
                                </Button>
                            : undefined
                        }
                        {
                            textCenter ?
                                <p> { textCenter } </p>
                            : undefined
                        }
                    </div>

                    <div className = 'right'>
                        {
                            next ? 
                                <Button
                                    as          = { Link } 
                                    variant     = 'none'
                                    className   = 'next' 
                                    to          = { next } 
                                    title       = 'Siguiente'
                                >
                                    <FontAwesomeIcon className='icon' icon={faArrowAltCircleRight} size='lg'/>
                                </Button>
                            : undefined
                        }
                    </div>
                </Container>
            </footer>
            {
                tour?.length > 0 ?
                    <Tour
                        steps  = { tour.steps }
                    />
                : undefined
            }
            {
                onboard ?
                    <OnBoard 
                        show        = { onboard.show }
                        onHide      = { onboard.onHide }
                        className   = { onboard.className }
                        title       = { onboard.title }
                        slides      = { onboard.slides }
                    />
                : undefined
            }
        </>
    )
}