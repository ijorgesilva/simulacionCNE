import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

import CandidateSelected from './candidateSelected'
import { CandidateCard } from '../../blurb'
import { useFirstRender } from '../../../hooks/useFirstRender'
import Header from '../../header'
import Footer from '../../footer'

import '../../app.scss'

export default function Regional ( { location, pageContext } ) {

    const { title, periodoDetails } = pageContext

    const firstRender = useFirstRender()

    const [ onBoard, setOnBoard ] = useState(false)
    
    // Check if it is the first simulation 
    useEffect( () => {
        if( firstRender ) {
        window.scrollTo({
            top: 80,
            left: 0,
            behavior: 'smooth'
        })
        }
        if ( localStorage.getItem('onBoard') === null ) {
        modifyOnBoard(true)()
        }
    })

    const modifyOnBoard = ( status ) => () => {
        if (status === true ){
        setOnBoard(true)
        localStorage.setItem('onBoard', 'false')
        }
        if (status === false ){
        setOnBoard(false)
        localStorage.setItem('onBoard', 'false')
        }
    }

    const content = {
        columnTitle: 'Gobernadora o Gobernador',
        vote: 'VOTAR',
        textFooter: 'Centro #140921920. Mesa #8',
        noticeText: 'Seleccione la Gobernadora o Gobernador por el cual desea votar',
        confirmationNoticeText: 'Presione votar para confirmar voto o vaya hacia atrás para cambiar su voto.',
    }

    const onBoardTour = { 
        title: 'Bienvenido al Simulador del Voto',
        className: '',
        onClick: modifyOnBoard(true), 
        show: onBoard,
        onHide: modifyOnBoard(false),
        content: {
        linkTitle: 'Ayuda'
        },
        slides: [
            {
            title: '¡BIENVENIDO AL SIMULADOR REGIONALES 2021!',
            text: `
                <p>Aquí podrás practicar las diferentes formas de ejercer tu derecho al voto en las próximas elecciones del <strong><em>21 de noviembre de 2021.</em></strong></p>
                <p>Recuerda que esta es una simulación para conocer el uso de la máquina y algunos detalles pueden ser diferentes en la máquina real cuando estés ejerciendo tu derecho al voto.</p>
            `,
            graphic: undefined,
            },
            {
            title: 'SELECCIONA EL PARTIDO DE TU PREFERENCIA',
            text: `
                <p>La máquina de votación te pedirá elegir el partido de tu preferencia.</p>
                <p>Al elegir el partido, automáticamente se seleccionarán todos los candidatos que representen el partido seleccionado.</p>
            `,
            graphic: undefined,
            },
            {
            title: 'VOTAR POR DIFERENTES PARTIDOS O CANDIDATOS',
            text: `
                <p>Luego de haber elegido el partido de tu preferencia principal, selecciona el cargo específico que deseas cambiar, y luego selecciona un nuevo partido o candidato.</p>
                <p>Esto deberás hacerlo con cada uno de los cargos donde deseas cambiar el partido o el candidato de tu preferencia.</p>
            `,
            graphic: undefined,
            },
            {
            title: 'BOTONES DE VOLVER',
            text: `
                <p>En la barra inferior de la pantalla, cuando sea posible, aparecerán dos botones donde podrás regresar a la vista anterior o retornar a la vista donde te encontrabas previamente.</p>
            `,
            graphic: undefined,
            }
        ]
    }

    // Candidate Selected Modal
    const [ candidateSelectedModal, setCandidateSelectedModal ] = useState(false)
    const candidateSelectedModalClose = () => setCandidateSelectedModal(false)

    // Candidate Selected Information
    const [ candidateSelected, setCandidateSelected ] = useState({})
    const candidateSelection = ( candidate ) => () => {
        console.log(candidate)
        setCandidateSelected({
            ...candidate
        })
        setCandidateSelectedModal(true)
    }

    return (
        <>

            <Header
                title         = { title } 
                periodoTitle  = { title }
                location      = { location } 
                description   = { 'Resumen de la pagina' }
                article       = { false }
                metaTags      =   {{
                                    noIndex: false,
                                }}
                showBar
                noticeText    = { content.noticeText }
            />
            <main className = 'candidates regional'>
                <Container 
                    style = { { 
                        minHeight: `calc( 100vh - 45px - 60px - 90px - 6rem )`
                    } }
                    fluid 
                >
                    {
                        periodoDetails.periodoRegionalSingle.map( (_, index) => (
                            <CandidateCard 
                                key             = { index }
                                className       = { `` }
                                contextClass    = { 'swap' }
                                status          = 'publish'
                                style           =  {
                                    { 
                                        gridArea: `c${_.periodoRegionalSingleColumn}x${_.periodoRegionalSingleRow}`,
                                    }
                                }
                                // Candidate
                                name            = { _.periodoRegionalSingleCandidate[0].candidatoDetails?.candidatoName }
                                photo           = { _.periodoRegionalSingleCandidate[0].candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                // Party
                                title           = { _.periodoRegionalSingleParty[0].partidoDetails?.partidoTitle }
                                overlayColor    = { _.periodoRegionalSingleParty[0].partidoDetails?.partidoColor }
                                logo            = { _.periodoRegionalSingleParty[0].partidoDetails?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                poster          = { _.periodoRegionalSingleParty[0].partidoDetails?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                layoutType      = { 'principal' }
                                onClick         = { candidateSelection(_) }
                            />
                        ))
                    }
                    <CandidateSelected 
                        candidate           = { candidateSelected }
                        show                = { candidateSelectedModal }
                        onHide              = { candidateSelectedModalClose }
                        noticeMessage       = { content.confirmationNoticeText }
                        className           = { '' }
                        title               = { title }
                        voteText            = { content.vote }
                        voteUrl             = { '/success' }
                        columnTitle         = { content.columnTitle }
                    />
                </Container>
            </main>

            <Footer
                textCenter      = { content.textFooter }
                onboard         = { onBoardTour }
            />

        </>
    )
}