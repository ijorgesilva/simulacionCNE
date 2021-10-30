import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import './partyCard.scss'

export default function PartyCard ( 
    { 
        className, 
        style,
        overlayColor,
        url,

        // Partido
        logo,
        title,
        poster,
        
    } 
) {
    
    return (
        <div className = {`partyCard card ${ className ? className : ''}`} style = { style }>
            <Link 
                to = { url } 
                title = {`Votar ${ title ? 'por ' + title : '' }`}
            >
                <div className = 'card-body'>
                    {
                        logo && !poster ?
                            <GatsbyImage
                                className       = { 'logo' }
                                image           = { logo }
                                objectFit       = { 'contain' }
                                alt             = { title }
                            />
                        : undefined
                    }
                    <div 
                        className = {`background ${ overlayColor ? 'overlay' : ''}`}
                        style = {{
                            backgroundColor: overlayColor,
                        }}
                    >
                        {
                            logo ?
                                <GatsbyImage
                                    className       = { 'poster' }
                                    image           = { poster }
                                    objectFit       = { 'contain' }
                                    alt             = { title }
                                />
                            : undefined
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}