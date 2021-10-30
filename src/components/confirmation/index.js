import React from 'react'
import { Link } from 'gatsby'

import './confirmation.scss'

import { Modal, Button } from 'react-bootstrap'

export default function Confirmation ( {
    className,
    onHide,
    show,
    buttonUrl,
    buttonText,
} ) {
    return (
        <Modal 
            className       = {`confirmation ${ className ? className : ''}`}
            show            = { show }
            onHide          = { onHide }
            size            = 'lg'
            aria-labelledby = 'contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Faltan Opciones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className = 'content'>
                    La OFP dejó cargos sin postular. Presione Continuar para completar las "opciones sin seleccionar"
                </div>

                <div className = 'btn-list'>
                    <Button 
                        variant = 'outline-dark' 
                        onClick = { onHide }
                        size    = 'lg'
                    >
                        Continuar
                    </Button>
                    {
                        buttonUrl && buttonText ?
                            <Button
                                as      = { Link }
                                to      = { buttonUrl }
                                variant = 'outline-dark'
                                size    = 'lg'
                            >
                                {buttonText}
                            </Button>
                        : undefined
                    }
                </div>

            </Modal.Body>
        </Modal>
    )
} 