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

        // Candidato
        photo,
        name,

        // Partido
        title,
        logo,
        color,
        poster,
        
        // Regular Card
        text,
        textSmall,
    } 
) {
    
    return (
        <div className = {`partyCard card ${ className ? className : ''}`} style = { style }>
            <Link 
                to = { url } 
                title = {`Votar ${ title ? 'por ' + title : '' }`}
                className='row'
            >
                {
                    photo ? 
                        <div className={`col-md-4`}>
                            <GatsbyImage
                                className       = { '' }
                                image           = { photo }
                                objectFit       = { 'contain' }
                                alt             = { name }
                            />
                        </div>
                    : undefined
                }
                <div className={`col-md-${ photo ? '8' : '12' }`}>
                    <div className='card-body'>

                        {/* Candidato / Partido */}
                        {
                            logo ?
                                <GatsbyImage
                                    className       = { 'logo' }
                                    image           = { logo }
                                    objectFit       = { 'contain' }
                                    alt             = { title }
                                />
                            : undefined
                        }

                        {/* Candidato */}
                        {
                            name ? 
                                <h5 className='card-title'> { name } </h5>
                            : undefined
                        }

                        {/* Regular Card */}
                        {
                            text ?
                                <p className='card-text'> { text } </p>
                            : undefined
                        }
                        {
                            textSmall ?
                            <p className='card-text'><small className='text-muted'>{textSmall}</small></p>
                            : undefined
                        }

                        {/* Candidato / Partido */}
                        <div 
                            className = {`background ${ overlayColor ? 'overlay' : ''}`}
                            style = {{
                                backgroundColor: overlayColor,
                            }}
                        >
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}