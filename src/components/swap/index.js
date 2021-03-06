import React from 'react'
import { Modal } from 'react-bootstrap'
import Notice from '../header/notice'
import { Candidates } from '../grid'
import { Party } from '../grid'

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
        replaceTitle,
        preFilterByParty,
        swapCandidate,
        fullCandidateList,
        // Swap Party's Candidate List
        swapPartyCandidates,
        swapPartyOnly,
        replacingSide,
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
                {
                    swapPartyOnly ?
                        <Party 
                            contextClass            = { 'swap' }
                            cardStyle               = { cardStyle }
                            swapCandidate           = { swapCandidate }
                            fullCandidateList       = { fullCandidateList }
                            swapPartyCandidates     = { swapPartyCandidates }
                            swapPartyOnly           = { swapPartyOnly }
                            replacingSide           = { replacingSide }
                        />
                    :
                        <Candidates 
                            items               = { candidates }
                            cardStyle           = { cardStyle }
                            indexClicked        = { indexClicked }
                            candidateTarget     = { candidateTarget }
                            modifyCandidate     = { modifyCandidate }
                            contextClass        = { 'swap' }
                            replaceTitle        = { replaceTitle }
                            preFilterByParty    = { preFilterByParty }
                            voidCandidate       = { voidCandidate }
                            swapCandidate       = { swapCandidate }
                            fullCandidateList   = { fullCandidateList }
                            swapPartyCandidates = { swapPartyCandidates }
                            swapPartyOnly       = { swapPartyOnly }
                        />
                }
            </Modal.Body>
        </Modal>
    )
}