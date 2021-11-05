import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Container } from 'react-bootstrap'

import Notice from './notice'
import { useSimulatorConf } from '../../hooks/useSimulatorConf'
import config from '../../../data/SiteConfig'
import './headerBar.scss'

export default function HeaderBar ( { periodoTitle, noticeText, style } ) {
    const webConf = useSimulatorConf()
    const logo  = webConf.simulatorConfiguration.configurationCustomize.configurationCustomizeLogo?.localFile.childImageSharp.gatsbyImageData
    
    return (
        <>
            <Navbar className = 'headerBar' variant='dark' style = { style } >
                <Container fluid>
                    <Link to = '/' title = {periodoTitle}>
                        <h1 className = 'siteTitle' >{ periodoTitle }</h1>
                    </Link>
                    <Navbar.Brand className = 'pull-right'>
                        <Link to = '/' title = {config.siteTitle}>
                            {
                                logo ?
                                    <GatsbyImage
                                        className       = { '' }
                                        image           = { logo }
                                        objectFit       = { 'contain' }
                                        alt             = { config.siteTitleShort }
                                    />
                                :
                                    undefined
                            }
                        </Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Notice 
                text    = { noticeText }
                style   = { style } 
            />
        </>
    )
}