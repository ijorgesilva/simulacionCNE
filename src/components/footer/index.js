import React from 'react'
import { Link } from 'gatsby'
import { Container, Button } from 'react-bootstrap'
import  { 
            faQuestionCircle,
            faArrowAltCircleLeft,
            faArrowAltCircleRight
        } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
        <footer className = 'footer pt-3 pb-3'>
            <Container fluid>
                <div className = 'left'>
                    {
                        before ?
                            <Link 
                                className   = 'before' 
                                to          = { before } 
                                title       = 'Anterior'
                            >
                                <FontAwesomeIcon className='icon' icon={faArrowAltCircleLeft} size="lg"/>
                            </Link>
                        : undefined
                    }
                    {
                        tour ?
                            <a className = 'help' href='#' title = 'Ayuda'>
                                <FontAwesomeIcon className='icon' icon={faQuestionCircle} size="lg"/>
                            </a>
                        : undefined
                    }
                    {
                        onboard ?
                            <a className = 'help onboard' href='#' title = 'Ayuda'>
                                <FontAwesomeIcon className='icon' icon={faQuestionCircle} size="lg"/>
                            </a>
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
                            <Link 
                                className   = 'next' 
                                to          = { next } 
                                title       = 'Siguiente'
                            >
                                <FontAwesomeIcon className='icon' icon={faArrowAltCircleRight} size="lg"/>
                            </Link>
                        : undefined
                    }
                </div>
            </Container>
        </footer>
    )
}