import React from 'react'
import { Modal } from 'react-bootstrap'
import Notice from '../header/notice'
import { Candidates } from '../grid'
import Footer from '../footer'

import './swap.scss'

export default function Swap ( 
    {
        className,
        title,
        noticeMessage,
        candidates,
        cardStyle,
        show,
        onHide,
        fullScreen,
        candidateTarget,
        modifyCandidate,
        indexClicked,
        voidCandidate,
    } 
) {
    return (
        <Modal 
            className       = {`swap ${ className ? className : ''} ${ fullScreen ? 'fullscreen' : ''}`}
            show            = { show }
            onHide          = { onHide }
            size            = 'xl'
            aria-labelledby = 'contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {
                noticeMessage ?
                    <Notice 
                        text = { noticeMessage }
                    />
                : undefined
            }
            <Modal.Body>
                <Candidates 
                    items           = { candidates }
                    cardStyle       = { cardStyle }
                    candidateTarget = { candidateTarget }
                    modifyCandidate = { modifyCandidate }
                />
                <Footer
                    indexClicked    = { indexClicked }
                    candidateTarget = { candidateTarget }
                    voidCandidate   = { voidCandidate }
                />
            </Modal.Body>
        </Modal>
    )
}