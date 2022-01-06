import React, { useState, useEffect } from 'react'
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
    className,
    mode,
    before,
    beforeOnClick,
    next,
    textCenter,
    buttonUrl,
    buttonText,
    buttonOnClick,
    buttonVariant,
    tour,
    onboard,
    indexClicked,
    voidCandidate,
    voidVisibility,
    candidateTarget,
} ) {

    const [ nextButton, setNextButton ] = useState(false)
    
    useEffect( () => {
        if ( localStorage.getItem('nextButton') ){
            setNextButton(true)
            localStorage.setItem('nextButton', 'true')
        }
    })

    const onNextButton = () => () => {
        setNextButton(true)
        localStorage.setItem('nextButton', 'true')
        navigate(-1)
    }
    
    return (
        <>
            <footer className = {`footer ${ className ? className : '' } ${ mode ? mode : 'light' }`}>
                <Container fluid>
                    <div className = 'left'>
                        {   
                            voidVisibility ?
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
                            : undefined
                        }

                        {
                            before ?
                                <Button 
                                    as          = { Link }
                                    variant     = 'outline-dark'
                                    className   = 'before' 
                                    onClick     = { beforeOnClick }
                                    to          = { before } 
                                    title       = 'Anterior'
                                >
                                    <FontAwesomeIcon className='icon' icon={faArrowAltCircleLeft} size='lg'/>
                                </Button>
                            :
                                beforeOnClick ?
                                    <Button 
                                        variant     = 'outline-dark'
                                        className   = 'before' 
                                        onClick     = { beforeOnClick }
                                        title       = 'Anterior'
                                    >
                                        <FontAwesomeIcon className='icon' icon={faArrowAltCircleLeft} size='lg'/>
                                    </Button>
                                :
                                    undefined

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
                            : 
                                buttonOnClick && buttonText ?
                                    <Button 
                                        onClick = { buttonOnClick() }
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
                            next && nextButton ? 
                                <Button
                                    variant     = 'outline-dark'
                                    className   = 'next' 
                                    onClick     = { onNextButton() }
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