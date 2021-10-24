import React, { useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'

import { CandidateCard } from '../blurb'
import Swap from '../swap'
import './ballot.scss'
import { useCreateInitialBallot } from '../../hooks/useCreateInitialBallot'
import { useGetCandidates } from '../../hooks/useGetCandidates'
import '../app.scss'

export default function Ballot ( 
    {
        className,
        party,

        // Governors and State Legislative Council 
        governor,
        list,
        nominal,

        // Mayor and Municipal Council 
        mayor,
        municipalList,
        municipalNominal,
    } 
) {
    const candidates = useGetCandidates()

    const initialBallot = useCreateInitialBallot(
            party,
            governor,
            list,
            nominal,
            mayor,
            municipalList,
            municipalNominal
        )
    
    const linkTextEmpty = 'Postular Candidato'
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

    const [ modalArrayShow, setArrayModalShow ] = useState({
        lPrincipal: false,
        lList: false,
        lNominal: false,
        mPrincipal: false,
        mList: false,
        mNominal: false,
    })

    // TODO: DRY, transform into toggle function
    const closeModalState = ( key ) => () => {
        let newState = {...modalArrayShow}
        newState[key] = false
        setArrayModalShow(newState)
    }
    const openModalState = ( key ) => () => {
        let newState = {...modalArrayShow}
        newState[key] = true
        setArrayModalShow(newState)
    }

    const [ candidatesSelection, setCandidate ] = useState({...initialBallot})
    // console.log(candidatesSelection)

    return (
        <div className = {`ballot ${ className ? className : '' }`}>
            <Container fluid className = 'columns respect-aspect-ratio'>

                {/* Column One */}
                <div className = 'column bg-light'>
                    <h2 className = 'title'>
                        {titles.lTitle}
                    </h2>
                    <div className = 'candidates'>
                        <div className ='governor'> 
                            <h3 className = 'subtitle'>
                                {titles.lPrincipal}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.legislative.principal ?
                                        <CandidateCard 
                                            className       = '' 
                                            onClick         = { openModalState('lPrincipal') }
                                            // Candidate
                                            name            = { initialBallot.legislative.principal.candidatoDetails.candidatoName }
                                            photo           = { initialBallot.legislative.principal.candidatoDetails.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                            // Party
                                            title           = { initialBallot.legislative.principal.party.partidoDetails.partidoTitle }
                                            overlayColor    = { initialBallot.legislative.principal.party.partidoDetails.partidoColor }
                                            logo            = { initialBallot.legislative.principal.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                            layoutType      = 'principal'
                                        />
                                    : 
                                        <CandidateCard 
                                            className       = '' 
                                            onClick         = { openModalState('lPrincipal') }
                                            linkText        = { linkTextEmpty }
                                            name            = { linkTextEmpty }
                                            layoutType      = 'principal empty'
                                        />
                                }
                                <Swap 
                                    className           = {''}
                                    title               = 'Seleccione Gobernador'
                                    noticeMessage       = { titles.messageModal }
                                    candidates          = { candidates.legislative.principals }
                                    cardStyle           = 'principal'
                                    show                = { modalArrayShow.lPrincipal }
                                    onHide              = { closeModalState('lPrincipal') } 
                                    // onClick             = { setCandidate }
                                />
                            </div>
                        </div>
                        <div className ='list'> 
                            <h3 className = 'subtitle'>
                                {titles.lList}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.legislative.list?.length > 0 ?
                                        initialBallot.legislative.list.map( ( _, index ) => (
                                            _.id != 0 ?
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('lList') }
                                                    // Candidate
                                                    name            = { _.candidatoDetails.candidatoName }
                                                    // Party
                                                    title           = { _.party.partidoDetails.partidoTitle }
                                                    overlayColor    = { _.party.partidoDetails.partidoColor }
                                                    logo            = { _.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                    layoutType      = 'list'
                                                />
                                            :
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = ''
                                                    onClick         = { openModalState('lList') }
                                                    linkText        = { linkTextEmpty }
                                                    name            = { linkTextEmpty }
                                                    layoutType      = 'list empty'
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
                                />
                            </div>
                        </div>
                        <div className ='nominal'> 
                            <h3 className = 'subtitle'>
                                {titles.lNominal}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.legislative.nominal?.length > 0 ?
                                        initialBallot.legislative.nominal.map( ( _, index ) => (
                                            _.id != 0 ?
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('lNominal') }
                                                    // Candidate
                                                    name            = { _.candidatoDetails.candidatoName }
                                                    // Party
                                                    title           = { _.party.partidoDetails.partidoTitle }
                                                    overlayColor    = { _.party.partidoDetails.partidoColor }
                                                    logo            = { _.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                    layoutType      = 'list'
                                                />
                                            :
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('lNominal') }
                                                    linkText        = { linkTextEmpty }
                                                    name            = { linkTextEmpty }
                                                    layoutType      = 'list empty'
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
                                />
                            </div>
                        </div> 
                    </div>
                </div>

                {/* Column Two */}
                <div className = 'column bg-light'>
                    <h2 className = 'title'>
                        {titles.mTitle}
                    </h2>
                    <div className = 'candidates'>
                        <div className ='mayor'> 
                            <h3 className = 'subtitle'>
                                {titles.mPrincipal}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.municipal.principal ?
                                        <CandidateCard 
                                            className       = ''
                                            onClick         = { openModalState('mPrincipal') }
                                            // Candidate
                                            name            = { initialBallot.municipal.principal.candidatoDetails.candidatoName }
                                            photo           = { initialBallot.municipal.principal.candidatoDetails.candidatoPhoto?.localFile.childImageSharp.gatsbyImageData }
                                            // Party
                                            title           = { initialBallot.municipal.principal.party.partidoDetails.partidoTitle }
                                            overlayColor    = { initialBallot.municipal.principal.party.partidoDetails.partidoColor }
                                            logo            = { initialBallot.municipal.principal.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                            layoutType      = 'principal'
                                        />
                                    : 
                                        <CandidateCard 
                                            className       = '' 
                                            onClick         = { openModalState('mPrincipal') }
                                            linkText        = { linkTextEmpty }
                                            name            = { linkTextEmpty }
                                            layoutType      = 'principal empty'
                                        />
                                }
                                <Swap 
                                    className       = {''}
                                    title           = {`Seleccione ${titles.mPrincipal}` }
                                    candidates      = { candidates.municipal.principals }
                                    cardStyle       = 'principal'
                                    show            = { modalArrayShow.mPrincipal }
                                    onHide          = { closeModalState('mPrincipal') } 
                                    noticeMessage   = { titles.messageModal }
                                />
                            </div>
                        </div>
                        <div className ='list'> 
                            <h3 className = 'subtitle'>
                                {titles.mList}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.municipal.list?.length > 0 ?
                                        initialBallot.municipal.list.map( ( _, index ) => (
                                            _.id != 0 ?
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('mList') }
                                                    // Candidate
                                                    name            = { _.candidatoDetails.candidatoName }
                                                    // Party
                                                    title           = { _.party.partidoDetails.partidoTitle }
                                                    overlayColor    = { _.party.partidoDetails.partidoColor }
                                                    logo            = { _.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                    layoutType      = 'list'
                                                />
                                            :
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('mList') }
                                                    linkText        = { linkTextEmpty }
                                                    name            = { linkTextEmpty }
                                                    layoutType      = 'list empty'
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
                                />
                            </div>
                        </div>
                        <div className ='nominal'> 
                            <h3 className = 'subtitle'>
                                {titles.mNominal}
                            </h3>
                            <div className = 'blurbs'>
                                {
                                    initialBallot.municipal.nominal?.length > 0 ?
                                        initialBallot.municipal.nominal.map( ( _, index ) => (
                                            _.id != 0 ?
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('mNominal') }
                                                    // Candidate
                                                    name            = { _.candidatoDetails.candidatoName }
                                                    // Party
                                                    title           = { _.party.partidoDetails.partidoTitle }
                                                    overlayColor    = { _.party.partidoDetails.partidoColor }
                                                    logo            = { _.party.partidoDetails.partidoLogo?.localFile.childImageSharp.gatsbyImageData }
                                                    layoutType      = 'list'
                                                />
                                            :
                                                <CandidateCard 
                                                    key             = { index }
                                                    className       = '' 
                                                    onClick         = { openModalState('mNominal') }
                                                    linkText        = { linkTextEmpty }
                                                    name            = { linkTextEmpty }
                                                    layoutType      = 'list empty'
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
                                />
                            </div>
                        </div> 
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}