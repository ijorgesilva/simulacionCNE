import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Lottie from 'react-lottie-player'

import tiltPhone from '../../assets/animations/tilt-phone-left.json'

import './simulatorNotice.scss'

export default function SimulatorNotice ( { className, text } ) {

    return (
        <div className = {`simulatorNotice ${ className ? className : '' }`}>
            <Container fluid className = 'content'>
            {
                text ?
                    <Alert>{text}</Alert>
                :
                    <>
                        <Lottie 
                              loop
                              play
                              animationData={tiltPhone}
                              style={{ width: 150, height: 150 }}
                        />
                        <Alert variant='warning'><FontAwesomeIcon className='icon' icon={faExclamationTriangle} size='lg'/> 
                            Cambie la orientación de su dispositivo a horizontal.
                        </Alert>
                    </>
            }
            </Container>
        </div>
    )
}