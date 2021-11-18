import React from 'react'
import { Helmet } from 'react-helmet'

import SEO from '../seo'
import HeaderBar from './headerBar'
import SimulatorNotice from '../simulatorNotice'

export default function Header ( 
    { 
        title, location, image, description, article, className, pageId, metaTags, showBar, periodoTitle, noticeText, style
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
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-210627147-1" />
                <script type="text/javascript">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-210627147-1');`}
                </script>
                <script type="text/javascript">
                    {` window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
                        heap.load("2558021626");`}
                </script>
            </Helmet>
            <SimulatorNotice />
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
                        style           = { style }
                    />
                : 
                    undefined
            }

        </>
    )
}