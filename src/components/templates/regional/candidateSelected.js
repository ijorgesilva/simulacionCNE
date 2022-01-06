import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import Notice from '../../header/notice'
import Footer from '../../footer'
import { CandidateCard } from '../../blurb'

import './candidateSelected.scss'

export default function CandidateSelected ( 
    {
        className,
        title,
        candidate,
        noticeMessage,
        show,
        onHide,
        voteText,
        voteUrl,
        columnTitle,
    } 
) {

    return (
        <Modal 
            className       = {`candidateSelected fullscreen ${ className ? className : ''}`}
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
                <main className = ''>
                    <Container 
                        style = { { 
                            minHeight: `calc( 100vh - 45px - 60px - 90px - 6rem )`
                        } } 
                        className = 'flexCenter'
                        fluid 
                    >
                        <div className = 'columns'>
                            <h2 className = 'title'>
                                {columnTitle}
                            </h2>
                            <div className = 'column'>
                                {
                                    candidate?.periodoRegionalSingleColumn ?
                                        <CandidateCard 
                                            className       = { `candidateSelected` }
                                            contextClass    = { 'swap' }
                                            status          = 'publish'
                                            linkText        = ''
                                            // Candidate
                                            name            = { candidate.periodoRegionalSingleCandidate[0].candidatoDetails?.candidatoName }
                                            photo           = { candidate.periodoRegionalSingleCandidate[0].candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                            // Party
                                            title           = { candidate.periodoRegionalSingleParty[0].partidoDetails?.partidoTitle }
                                            overlayColor    = { candidate.periodoRegionalSingleParty[0].partidoDetails?.partidoColor }
                                            logo            = { candidate.periodoRegionalSingleParty[0].partidoDetails?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                            poster          = { candidate.periodoRegionalSingleParty[0].partidoDetails?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                            layoutType      = { 'principal' }
                                        />
                                    : undefined
                                }
                            </div>
                        </div>
                    </Container>
                </main>
                <Footer
                    beforeOnClick   = { onHide }
                    buttonUrl       = { voteUrl }
                    buttonText      = { voteText }
                />
            </Modal.Body>
        </Modal>
    )
}