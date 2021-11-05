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
        partyId,
        logo,
        title,
        poster,
        onClickAction,
    } 
) {
    
    return (
        <div className = {`partyCard card ${ className ? className : ''}`} style = { style }>
            <Link 
                to = { url } 
                title = {`Votar ${ title ? 'por ' + title : '' }`}
                onClick = { onClickAction(partyId) }
            >
                <div className = {`card-body ${ logo ? 'logo' : '' }`}>
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
                        className = {`${ logo ? 'background' : '' } ${ overlayColor ? 'overlay' : ''}`}
                        style = {{
                            backgroundColor: overlayColor,
                        }}
                    >
                        {
                            poster ?
                                <GatsbyImage
                                    className       = { 'poster' }
                                    image           = { poster }
                                    objectFit       = { 'contain' }
                                    alt             = { title }
                                    objectPosition  = 'center center'
                                />
                            : undefined
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}