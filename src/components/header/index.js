import React from 'react'
import { Helmet } from 'react-helmet'

import SEO from '../seo'
import HeaderBar from './headerBar'

export default function Header ( 
    { 
        title, location, image, description, article, className, pageId, metaTags, showBar, periodoTitle, noticeText
    } 
){
    
    const url = location?.href ? location.href : ''
    
    return (
        <>
            <Helmet>
                <html id = {`${pageId ? 'page-'+pageId : ''}`} className = {`${ className ? className : '' }`} />
                {
                    ( metaTags?.noIndex ) ?
                        <meta name='robots' content='noindex' />
                    :
                        undefined
                }
            </Helmet>
            <SEO 
                postPath    = { url } 
                title       = { title } 
                description = { description }
                image       = { image }
                article     = { article }
            />
            {
                showBar ?
                    <HeaderBar
                        periodoTitle    = { periodoTitle }
                        noticeText      = { noticeText }
                    />
                : 
                    undefined
            }

        </>
    )
}