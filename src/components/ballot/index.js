import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Container, Button } from 'react-bootstrap'
import { clone, cloneDeep, set } from 'lodash'

import { CandidateCard } from '../blurb'
import Swap from '../swap'
import './ballot.scss'
import { useGetInitialSwapList } from '../../hooks/useGetInitialSwapList'
import { useGetInitialStaticList } from '../../hooks/useGetInitialStaticList'
import { getCandidatesByPartyId } from '../../hooks/getCandidatesByPartyId'

import { useCurrentPeriod } from '../../hooks/useCurrentPeriod'
import { useGetBallots } from '../../hooks/useGetBallots'
import '../app.scss'

export default function Ballot ( 
    {
        className,
        location,
        initialBallot,
        partyId,
    } 
) {
    const currentPeriod = useCurrentPeriod()
    const ballots = useGetBallots()

    // Prevent direct access if Onboard is false and redirect to /
    useEffect( () => { 
        if ( !localStorage.getItem('onBoard') ) { 
            navigate('/')
        }
    })

    // STRINGS
    const titles = {
        postulateCandidate: 'Postular Candidato',
        messageModal: 'Seleccione el candidato de su preferencia',
        messageModalParty: 'Seleccione el partido de su preferencia',
        lTitle: 'Gobernadores y Consejo Legislativo Estadal',
        lPrincipal: 'Gobernador',
        lList: 'Consejo Legislativo Lista',
        lNominal: 'Consejo Legislativo Nominal',
        mTitle: 'Alcalde y Concejo Municipal',
        mPrincipal: 'Alcalde',
        mList: 'Concejo Municipal Lista',
        mNominal: 'Concejo Municipal Nominal',
        voidVote: 'Opción sin <br/>seleccionar', // Delete this line or declare it undefined for default behavior of Void Vote
    }
    const config = {
        replaceTitleList: 'Voto Lista',
        preFilterByParty: {
            nominal: true,
            list: false,
        },
        swapCandidate: true, // When true the selected candidate will be removed from the Swap modal
        swapPartySide: true,
    }

    // MODALS: General state Management
    let newState
    const [ modalArrayShow, setArrayModalShow ] = useState({
        lPrincipal: false,
        lList: false,
        lNominal: false,
        mPrincipal: false,
        mList: false,
        mNominal: false,
        lFull: false,
        mFull: false
    })
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

    // CANDIDATES: Initial Selection Logic
    const [ candidatesSelection, setCandidate ] = useState(cloneDeep({...initialBallot}))
    const [ indexClicked, setIndexClicked ] = useState(0)
    
    // SWAP AND NO SWAP LIST: Initial Swap List
    let tempCadidateSelection
    const initialSwapList       =  Object.assign({}, useGetInitialSwapList({...initialBallot}))
    const candidatesListFull    =  Object.assign({}, useGetInitialStaticList({...initialBallot}))

    useEffect( () => { // Check if Candidates have been selected previously
        if (localStorage.getItem(`candidates-${partyId}`)) {
            setCandidate(JSON.parse(localStorage.getItem(`candidates-${partyId}`)))
        }
        localStorage.setItem('nextButton', 'true')
    }, [])

    const modifyCandidate = ( candidate, position, index, id ) => () => {
        // TODO: Single/dynamic setting DRY
        tempCadidateSelection = cloneDeep(candidatesSelection)
        // Legislative
            if( position === 'legislative.principal' ){
                set( tempCadidateSelection, 'legislative.principal.status', 'publish' )
                set( tempCadidateSelection, 'legislative.principal', candidate )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'legislative.principal', candidate, id ))
                closeModalState('lPrincipal')()
            }
            if( position === 'legislative.list' ){
                set(tempCadidateSelection, `legislative.list[${index}]`, candidate )
                set(tempCadidateSelection, `legislative.list[${index}].status`, 'publish' )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'legislative.list', candidate, id ))
                closeModalState('lList')()
            }
            if( position === 'legislative.nominal' ){
                set(tempCadidateSelection, `legislative.nominal[${index}]`, candidate )
                set(tempCadidateSelection, `legislative.nominal[${index}].status`, 'publish' )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'legislative.nominal', candidate, id ))
                closeModalState('lNominal')()
            }
        // Municipal
            if( position === 'municipal.principal' ){
                set(tempCadidateSelection, 'municipal.principal.status', 'publish' )
                set(tempCadidateSelection, 'municipal.principal', candidate )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'municipal.principal', candidate, id ))
                closeModalState('mPrincipal')()
            }
            if( position === 'municipal.list' ){
                set(tempCadidateSelection, `municipal.list[${index}]`, candidate )
                set(tempCadidateSelection, `municipal.list[${index}].status`, 'publish' )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'municipal.list', candidate, id ))
                closeModalState('mList')()
            }
            if( position === 'municipal.nominal' ){
                set(tempCadidateSelection, `municipal.nominal[${index}]`, candidate )
                set(tempCadidateSelection, `municipal.nominal[${index}].status`, 'publish' )
                // setCandidatesOnSwap(swapListRemoveCandidate( temp, 'municipal.nominal', candidate, id ))
                closeModalState('mNominal')()
            }
        // Save values on Localstorage and State
        setCandidate(tempCadidateSelection)
        localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
    }

    const voidCandidate = ( position, index ) => () => {
        tempCadidateSelection = cloneDeep(candidatesSelection)
        // Legislative
            if( position === 'legislative.principal' ){
                set(tempCadidateSelection, 'legislative.principal', {} )
                set(tempCadidateSelection, 'legislative.principal.status', 'void' )                
                closeModalState('lPrincipal')()
            }
            if( position === 'legislative.list' ){
                set(tempCadidateSelection, `legislative.list[${index}]`, {} )
                set(tempCadidateSelection, `legislative.list[${index}].status`, 'void' )
                closeModalState('lList')()
            }
            if( position === 'legislative.nominal' ){
                set(tempCadidateSelection, `legislative.nominal[${index}]`, {} )
                set(tempCadidateSelection, `legislative.nominal[${index}].status`, 'void' )
                closeModalState('lNominal')()
            }
        // Municipal
            if( position === 'municipal.principal' ){
                set(tempCadidateSelection, 'municipal.principal', {} )
                set(tempCadidateSelection, 'municipal.principal.status', 'void' )
                closeModalState('mPrincipal')()
            }
            if( position === 'municipal.list' ){
                set(tempCadidateSelection, `municipal.list[${index}]`, {} )
                set(tempCadidateSelection, `municipal.list[${index}].status`, 'void' )
                closeModalState('mList')()
            }
            if( position === 'municipal.nominal' ){
                set(tempCadidateSelection, `municipal.nominal[${index}]`, {} )
                set(tempCadidateSelection, `municipal.nominal[${index}].status`, 'void' )
                closeModalState('mNominal')()
            }
        // Save values on Localstorage and State
        setCandidate(tempCadidateSelection)
        localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
    }

    /*
     * reset: if reset is true then resets candidates to initial values (initialBallot)
     */
    const swapPartyCandidates = ( partyIdSelected, replacingSide, reset ) => () => {
        tempCadidateSelection = cloneDeep(candidatesSelection)
        const candidates = cloneDeep(getCandidatesByPartyId(currentPeriod, ballots, partyIdSelected))
        
        if( replacingSide === 'legislative' ) {
            if (reset) {
                set( tempCadidateSelection, 'legislative', cloneDeep( initialBallot.legislative ) )
                setCandidate(tempCadidateSelection)
                localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
            } else {
                set( tempCadidateSelection, 'legislative', cloneDeep( candidates.legislative ) )
                setCandidate(tempCadidateSelection)
                localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
            }
            closeModalState('lFull')()
        }
        
        if( replacingSide === 'municipal' ) {
            if (reset) {
                set( tempCadidateSelection, 'municipal', cloneDeep( initialBallot.municipal ) )
                setCandidate(tempCadidateSelection)
                localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
            } else {
                set( tempCadidateSelection, 'municipal', cloneDeep( candidates.municipal ) )
                setCandidate(tempCadidateSelection)
                localStorage.setItem(`candidates-${partyId}`, JSON.stringify(tempCadidateSelection))
            }
            closeModalState('mFull')()
        }

    }

    return (
        <div className = {`ballot ${ className ? className : '' }`}>
            <Container fluid className = 'columns'>
                {/* Column One */}
                <div className = 'column'>
                    {
                        config.swapPartySide ? 
                            <h2 className = 'title button'>
                                <Button variant='outline-light' onClick = { openModalState('lFull') }>
                                    {titles.lTitle}
                                </Button>
                            </h2>
                        : 
                            <h2 className = 'title'>
                                {titles.lTitle}
                            </h2>
                    }
                    {/* Swap Legislative Side */}
                    <Swap 
                        className           = {''}
                        title               = {`Seleccione ${titles.lTitle}` }
                        cardStyle           = 'list'
                        show                = { modalArrayShow.lFull }
                        onHide              = { closeModalState('lFull') } 
                        noticeMessage       = { titles.messageModalParty }
                        swapCandidate       = { config.swapCandidate }
                        fullScreen
                        // Candidates
                        fullCandidateList   =   { 
                                                    candidatesListFull?.legislative.principals.concat(
                                                        candidatesListFull.legislative.list,
                                                        candidatesListFull.legislative.nominal,                                                        ) 
                                                }
                        // Swap Party's Candidate List
                        partyCandidateList  = { candidatesListFull?.legislative }
                        swapPartyCandidates = { swapPartyCandidates }
                        replacingSide       = 'legislative'
                        swapPartyOnly
                    />
                    <div className = 'candidatesBallot'>
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
                                    poster          = { candidatesSelection.legislative.principal.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                    layoutType      = 'principal'
                                    voidText        = { titles.voidVote }
                                />
                                <Swap 
                                    className           = {''}
                                    title               = 'Seleccione Gobernador'
                                    cardStyle           = 'principal'
                                    show                = { modalArrayShow.lPrincipal }
                                    onHide              = { closeModalState('lPrincipal') }
                                    noticeMessage       = { titles.messageModal }
                                    candidateTarget     = 'legislative.principal'
                                    candidates          = { initialSwapList.legislative.principals }
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.legislative.principals }
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
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                replaceTitle    = { config.replaceTitleList }
                                                layoutType      = 'list'
                                                voidText        = { titles.voidVote }
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className           = {''}
                                    title               = {`Seleccione ${titles.lList}` }
                                    replaceTitle        = { config.replaceTitleList }
                                    cardStyle           = 'list'
                                    show                = { modalArrayShow.lList }
                                    onHide              = { closeModalState('lList') } 
                                    noticeMessage       = { titles.messageModal }
                                    candidates          = { initialSwapList.legislative.list } // TODO: It shound't be initialSwapList, instead swap
                                    candidateTarget     = 'legislative.list'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    preFilterByParty    = { config.preFilterByParty.list }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.legislative.list }
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
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                                voidText        = { titles.voidVote }
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className           = {''}
                                    title               = {`Seleccione ${titles.lNominal}` }
                                    cardStyle           = 'list'
                                    show                = { modalArrayShow.lNominal }
                                    onHide              = { closeModalState('lNominal') } 
                                    noticeMessage       = { titles.messageModal }
                                    candidates          = { initialSwapList.legislative.nominal }
                                    candidateTarget     = 'legislative.nominal'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    preFilterByParty    = { config.preFilterByParty.nominal }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.legislative.nominal }
                                    fullScreen
                                />
                            </div>
                        </div> 
                    </div>
                    

                </div>

                {/* Column Two */}
                <div className = 'column'>
                    {
                        config.swapPartySide ? 
                            <h2 className = 'title button'>
                                <Button variant='outline-light' onClick = { openModalState('mFull') }>
                                    {titles.mTitle}
                                </Button>
                            </h2>
                        : 
                            <h2 className = 'title'>
                                {titles.mTitle}
                            </h2>
                    }
                    {/* Swap municipal Side */}
                    <Swap 
                        className           = {''}
                        title               = {`Seleccione ${titles.mTitle}` }
                        cardStyle           = 'list'
                        show                = { modalArrayShow.mFull }
                        onHide              = { closeModalState('mFull') } 
                        noticeMessage       = { titles.messageModalParty }
                        swapCandidate       = { config.swapCandidate }
                        fullScreen
                        // Candidates
                        fullCandidateList   =   { 
                                                    candidatesListFull?.municipal.principals.concat(
                                                        candidatesListFull.municipal.list,
                                                        candidatesListFull.municipal.nominal,                                                        ) 
                                                }
                        // Swap Party's Candidate List
                        partyCandidateList  = { candidatesListFull?.municipal }
                        swapPartyCandidates = { swapPartyCandidates }
                        replacingSide       = 'municipal'
                        swapPartyOnly
                    />
                    <div className = 'candidatesBallot'>
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
                                    poster          = { candidatesSelection.municipal.principal.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                    layoutType      = 'list'
                                    voidText        = { titles.voidVote }
                                />
                                <Swap 
                                    className           = {''}
                                    title               = 'Seleccione Alcalde'
                                    cardStyle           = 'list'
                                    show                = { modalArrayShow.mPrincipal }
                                    onHide              = { closeModalState('mPrincipal') }
                                    noticeMessage       = { titles.messageModal }
                                    candidateTarget     = 'municipal.principal'
                                    candidates          = { initialSwapList.municipal.principals }
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.municipal.principals }
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
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                replaceTitle    = { config.replaceTitleList }
                                                layoutType      = 'list'
                                                voidText        = { titles.voidVote }
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className           = {''}
                                    title               = {`Seleccione ${titles.mList}` }
                                    replaceTitle        = { config.replaceTitleList }
                                    cardStyle           = 'list'
                                    show                = { modalArrayShow.mList }
                                    onHide              = { closeModalState('mList') } 
                                    noticeMessage       = { titles.messageModal }
                                    candidates          = { initialSwapList.municipal.list }
                                    candidateTarget     = 'municipal.list'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    preFilterByParty    = { config.preFilterByParty.list }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.municipal.list }
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
                                                poster          = { _.party?.partidoPoster?.localFile.childImageSharp.gatsbyImageData }
                                                layoutType      = 'list'
                                                voidText        = { titles.voidVote }
                                            />
                                        ))
                                    : undefined
                                }
                                <Swap 
                                    className           = {''}
                                    title               = {`Seleccione ${titles.mNominal}` }
                                    cardStyle           = 'list'
                                    show                = { modalArrayShow.mNominal }
                                    onHide              = { closeModalState('mNominal') } 
                                    noticeMessage       = { titles.messageModal }
                                    candidates          = { initialSwapList.municipal.nominal }
                                    candidateTarget     = 'municipal.nominal'
                                    indexClicked        = { indexClicked }
                                    modifyCandidate     = { modifyCandidate }
                                    voidCandidate       = { voidCandidate }
                                    preFilterByParty    = { config.preFilterByParty.nominal }
                                    swapCandidate       = { config.swapCandidate }
                                    fullCandidateList   = { candidatesListFull?.municipal.nominal }
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