import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { set } from 'lodash'

import { CandidateCard } from '../blurb'
import Swap from '../swap'
import './ballot.scss'
import { useGetCandidates } from '../../hooks/useGetCandidates'
import '../app.scss'

export default function Ballot ( 
    {
        className,
        location,
        initialBallot,
    } 
) {
    
    const [ modalArrayShow, setArrayModalShow ] = useState({
        lPrincipal: false,
        lList: false,
        lNominal: false,
        mPrincipal: false,
        mList: false,
        mNominal: false,
    })
    const [ indexClicked, setIndexClicked ] = useState(0)

    let newState
    let temp = {}

    // TODO: DRY, transform into toggle function
    const closeModalState = ( key ) => () => {
        newState = {...modalArrayShow}
        newState[key] = false
        setArrayModalShow(newState)
    }
    const openModalState = ( key, indexClicked ) => () => {
        newState = {...modalArrayShow}
        newState[key] = true
        setIndexClicked(indexClicked)
        setArrayModalShow(newState)
    }

    // Candidate Selection Logic
    const pathName = String(location.pathname).replace(/\//g, '')
    const candidates = useGetCandidates()
    const [ candidatesSelection, setCandidate ] = useState({...initialBallot})
    

    // Check if Candidates have been selected previously
    useEffect(() => {
        if (localStorage.getItem(`candidates-${pathName}`)) {
            setCandidate(JSON.parse(localStorage.getItem(`candidates-${pathName}`)))
        }
        localStorage.setItem('nextButton', 'true')
    }, [])
    
    const titles = {
        postulateCandidate: 'Postular Candidato',
        messageModal: 'Seleccione el candidato de su preferencia',
        lTitle: 'Gobernadores y Consejo Legislativo Estadal',
        lPrincipal: 'Governador',
        lList: 'Consejo Legislativo Lista',
        lNominal: 'Consejo Legislativo Nominal',
        mTitle: 'Alcalde y Consejo Municipal',
        mPrincipal: 'Alcalde',
        mList: 'Consejo Municipal Lista',
        mNominal: 'Consejo Municipal Nominal'
    }

    const modifyCandidate = ( candidate, position, index ) => () => {
        // TODO: Single/dynamic setting DRY
        // Legislative
            if( position === 'legislative.principal' ){
                temp = set(candidatesSelection, 'legislative.principal.status', 'publish' )
                temp = set(candidatesSelection, 'legislative.principal', candidate )
                closeModalState('lPrincipal')()
            }
            if( position === 'legislative.list' ){
                temp = set(candidatesSelection, `legislative.list[${index}]`, candidate )
                temp = set(candidatesSelection, `legislative.list[${index}].status`, 'publish' )
                closeModalState('lList')()
            }
            if( position === 'legislative.nominal' ){
                temp = set(candidatesSelection, `legislative.nominal[${index}]`, candidate )
                temp = set(candidatesSelection, `legislative.nominal[${index}].status`, 'publish' )
                closeModalState('lNominal')()
            }
        // Municipal
            if( position === 'municipal.principal' ){
                temp = set(candidatesSelection, 'municipal.principal.status', 'publish' )
                temp = set(candidatesSelection, 'municipal.principal', candidate )
                closeModalState('mPrincipal')()
            }
            if( position === 'municipal.list' ){
                temp = set(candidatesSelection, `municipal.list[${index}]`, candidate )
                temp = set(candidatesSelection, `municipal.list[${index}].status`, 'publish' )
                closeModalState('mList')()
            }
            if( position === 'municipal.nominal' ){
                temp = set(candidatesSelection, `municipal.nominal[${index}]`, candidate )
                temp = set(candidatesSelection, `municipal.nominal[${index}].status`, 'publish' )
                closeModalState('mNominal')()
            }
        // Save values on Localstorage and State
        setCandidate(temp)
        localStorage.setItem(`candidates-${pathName}`, JSON.stringify(temp))
    }

    const voidCandidate = ( position, index ) => () => {
        // Legislative
            if( position === 'legislative.principal' ){
                temp = set(candidatesSelection, 'legislative.principal', {} )
                temp = set(candidatesSelection, 'legislative.principal.status', 'void' )
                closeModalState('lPrincipal')()
            }
            if( position === 'legislative.list' ){
                temp = set(candidatesSelection, `legislative.list[${index}]`, {} )
                temp = set(candidatesSelection, `legislative.list[${index}].status`, 'void' )
                closeModalState('lList')()
            }
            if( position === 'legislative.nominal' ){
                temp = set(candidatesSelection, `legislative.nominal[${index}]`, {} )
                temp = set(candidatesSelection, `legislative.nominal[${index}].status`, 'void' )
                closeModalState('lNominal')()
            }
        // Municipal
            if( position === 'municipal.principal' ){
                temp = set(candidatesSelection, 'municipal.principal', {} )
                temp = set(candidatesSelection, 'municipal.principal.status', 'void' )
                closeModalState('mPrincipal')()
            }
            if( position === 'municipal.list' ){
                temp = set(candidatesSelection, `municipal.list[${index}]`, {} )
                temp = set(candidatesSelection, `municipal.list[${index}].status`, 'void' )
                closeModalState('mList')()
            }
            if( position === 'municipal.nominal' ){
                temp = set(candidatesSelection, `municipal.nominal[${index}]`, {} )
                temp = set(candidatesSelection, `municipal.nominal[${index}].status`, 'void' )
                closeModalState('mNominal')()
            }
        // Save values on Localstorage and State
        setCandidate(temp)
        localStorage.setItem(`candidates-${pathName}`, JSON.stringify(temp))
    }

    return (
        <div className = {`ballot ${ className ? className : '' }`}>
            <Container fluid className = 'columns respect-aspect-ratio'>
                {/* Column One */}
                <div className = 'column'>
                    <h2 className = 'title'>
                        {titles.lTitle}
                    </h2>
                    <div className = 'candidates'>
                        <div className ='governor'> 
                            <h3 className = 'subtitle'>
                                {titles.lPrincipal}
                            </h3>
                            <div className = 'blurbs'>
                                <CandidateCard 
                                    className       = 'lprincipal publish' 
                                    contextClass    = 'ballot'
                                    onClick         = { openModalState('lPrincipal') }
                                    status          = { candidatesSelection.legislative.principal.status }
                                    // Candidate
                                    name            = { candidatesSelection.legislative.principal.candidatoDetails?.candidatoName }
                                    photo           = { candidatesSelection.legislative.principal.candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                    // Party
                                    title           = { candidatesSelection.legislative.principal.party?.partidoTitle }
                                    overlayColor    = { candidatesSelection.legislative.principal.party?.partidoColor }
                                    logo            = { candidatesSelection.legislative.principal.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                    layoutType      = 'principal'
                                />
                                <Swap 
                                    className           = {''}
                                    title               = 'Seleccione Gobernador'
                                    candidates          = { candidates.legislative.principals }
                                    cardStyle           = 'principal'
                                    show                = { modalArrayShow.lPrincipal }
                                    onHide              = { closeModalState('lPrincipal') }
                                    noticeMessage       = { titles.messageModal }
                                    candidateTarget     = 'legislative.principal'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div>
                        <div className ='list'> 
                            <h3 className = 'subtitle'>
                                {titles.lList}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    candidatesSelection.legislative.list?.length > 0 ?
                                        candidatesSelection.legislative.list.map( ( _, index ) => (
                                            <CandidateCard 
                                                key             = { index }
                                                status          = { _.status }
                                                className       = '' 
                                                contextClass    = 'ballot'
                                                onClick         = { openModalState('lList', index) }
                                                // Candidate
                                                name            = { _.candidatoDetails?.candidatoName }
                                                // Party
                                                title           = { _.party?.partidoTitle }
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className       = {''}
                                    title           = {`Seleccione ${titles.lList}` }
                                    candidates      = { candidates.legislative.list }
                                    cardStyle       = 'list'
                                    show            = { modalArrayShow.lList }
                                    onHide          = { closeModalState('lList') } 
                                    noticeMessage   = { titles.messageModal }
                                    candidateTarget = 'legislative.list'
                                    indexClicked    = { indexClicked }
                                    modifyCandidate = { modifyCandidate }
                                    voidCandidate   = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div>
                        <div className ='nominal'> 
                            <h3 className = 'subtitle'>
                                {titles.lNominal}
                            </h3>
                            <div className = 'blurbs'>

                                {
                                    candidatesSelection.legislative.nominal?.length > 0 ?
                                        candidatesSelection.legislative.nominal.map( ( _, index ) => (
                                            <CandidateCard 
                                                key             = { index }
                                                status          = { _.status }
                                                className       = ''
                                                contextClass    = 'ballot'
                                                onClick         = { openModalState('lNominal', index) }
                                                // Candidate
                                                name            = { _.candidatoDetails?.candidatoName }
                                                // Party
                                                title           = { _.party?.partidoTitle }
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className       = {''}
                                    title           = {`Seleccione ${titles.lNominal}` }
                                    candidates      = { candidates.legislative.nominal }
                                    cardStyle       = 'list'
                                    show            = { modalArrayShow.lNominal }
                                    onHide          = { closeModalState('lNominal') } 
                                    noticeMessage   = { titles.messageModal }
                                    candidateTarget = 'legislative.nominal'
                                    indexClicked    = { indexClicked }
                                    modifyCandidate = { modifyCandidate }
                                    voidCandidate   = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Column Two */}
                <div className = 'column'>
                    <h2 className = 'title'>
                        {titles.mTitle}
                    </h2>
                    <div className = 'candidates'>
                        <div className ='mayor'> 
                            <h3 className = 'subtitle'>
                                {titles.mPrincipal}
                            </h3>
                            <div className = 'blurbs'>
                                <CandidateCard 
                                    className       = 'mprincipal publish' 
                                    contextClass    = 'ballot'
                                    onClick         = { openModalState('mPrincipal') }
                                    status          = { candidatesSelection.municipal.principal.status }
                                    // Candidate
                                    name            = { candidatesSelection.municipal.principal.candidatoDetails?.candidatoName }
                                    photo           = { candidatesSelection.municipal.principal.candidatoDetails?.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                    // Party
                                    title           = { candidatesSelection.municipal.principal.party?.partidoTitle }
                                    overlayColor    = { candidatesSelection.municipal.principal.party?.partidoColor }
                                    logo            = { candidatesSelection.municipal.principal.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                    layoutType      = 'principal'
                                />
                                <Swap 
                                    className           = {''}
                                    title               = 'Seleccione Gobernador'
                                    candidates          = { candidates.municipal.principals }
                                    cardStyle           = 'principal'
                                    show                = { modalArrayShow.mPrincipal }
                                    onHide              = { closeModalState('mPrincipal') }
                                    noticeMessage       = { titles.messageModal }
                                    candidateTarget     = 'municipal.principal'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div>
                        <div className ='list'> 
                            <h3 className = 'subtitle'>
                                {titles.mList}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    candidatesSelection.municipal.list?.length > 0 ?
                                        candidatesSelection.municipal.list.map( ( _, index ) => (
                                            <CandidateCard 
                                                key             = { index }
                                                status          = { _.status }
                                                className       = '' 
                                                contextClass    = 'ballot'
                                                onClick         = { openModalState('mList', index) }
                                                // Candidate
                                                name            = { _.candidatoDetails?.candidatoName }
                                                // Party
                                                title           = { _.party?.partidoTitle }
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className       = {''}
                                    title           = {`Seleccione ${titles.mList}` }
                                    candidates      = { candidates.municipal.list }
                                    cardStyle       = 'list'
                                    show            = { modalArrayShow.mList }
                                    onHide          = { closeModalState('mList') } 
                                    noticeMessage   = { titles.messageModal }
                                    candidateTarget = 'municipal.list'
                                    indexClicked    = { indexClicked }
                                    modifyCandidate = { modifyCandidate }
                                    voidCandidate   = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div>
                        <div className ='nominal'> 
                            <h3 className = 'subtitle'>
                                {titles.mNominal}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    candidatesSelection.municipal.nominal?.length > 0 ?
                                        candidatesSelection.municipal.nominal.map( ( _, index ) => (
                                            <CandidateCard 
                                                key             = { index }
                                                status          = { _.status }
                                                className       = '' 
                                                contextClass    = 'ballot'
                                                onClick         = { openModalState('mNominal', index) }
                                                // Candidate
                                                name            = { _.candidatoDetails?.candidatoName }
                                                // Party
                                                title           = { _.party?.partidoTitle }
                                                overlayColor    = { _.party?.partidoColor }
                                                logo            = { _.party?.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className       = {''}
                                    title           = {`Seleccione ${titles.mNominal}` }
                                    candidates      = { candidates.municipal.nominal }
                                    cardStyle       = 'list'
                                    show            = { modalArrayShow.mNominal }
                                    onHide          = { closeModalState('mNominal') } 
                                    noticeMessage   = { titles.messageModal }
                                    candidateTarget = 'municipal.nominal'
                                    indexClicked    = { indexClicked }
                                    modifyCandidate = { modifyCandidate }
                                    voidCandidate   = { voidCandidate }
                                    fullScreen
                                />
                            </div>
                        </div> 
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}