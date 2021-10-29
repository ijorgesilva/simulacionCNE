import React from 'react'
import { Link, navigate } from 'gatsby'
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
    indexClicked,
    voidCandidate,
    candidateTarget,
} ) {
    
    return (
        <>
            <footer className = 'footer'>
                <Container fluid>
                    <div className = 'left'>
                        {   
                            voidCandidate && candidateTarget ?
                                <Button
                                    variant     = 'outline-dark'
                                    className   = 'voidVote' 
                                    title       = 'Hacer voto sin seleccionar'
                                    onClick     = { voidCandidate( candidateTarget, indexClicked ) }
                                >
                                    Sin seleccionar
                                </Button>
                            : undefined
                        }

                        {
                            before ?
                                <Button 
                                    as          = { Link }
                                    variant     = 'outline-dark'
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
                                    variant     = 'outline-dark'
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
                                    variant     = 'outline-dark'
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
                                    variant     = 'outline-dark'
                                    className   = 'next' 
                                    onClick     = { () => navigate(-1) }
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