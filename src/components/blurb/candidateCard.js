import React from 'react'
import { Button } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'

import './candidateCard.scss'

export default function CandidateCard ( 
    { 
        className, 
        style,
        overlayColor,
        onClick,
        layoutType,

        // Candidato
        photo,
        name,
        linkText,

        // Partido
        title,
        logo,
        color,
        poster,
        
    } 
) {
    
    return (
        <div className = {`candidateCard card ${ className ? className : ''}`} style = { style }>
            <Button 
                variant     = 'none'
                onClick     = { onClick }
                title       = {`${ linkText ? linkText : 'Cambiar Candidato'}`}
                className   = {`card-body link ${ layoutType ? layoutType : 'list'}`}
            >
                <div className='main'>
                    
                    <div className={`photo`}>
                        {
                            photo ? 
                                <GatsbyImage
                                    className       = { '' }
                                    image           = { photo }
                                    alt             = { name }
                                    objectFit       = 'contain'
                                    objectPosition  = 'center center'
                                />
                            : undefined
                        }
                    </div>
                    <div className={`information`}>
                        <div className={`party`}>
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
                        </div>
                        <div className={`candidacy`}>
                            {
                                name ? 
                                    <h5 className='card-title'> { name } </h5>
                                : undefined
                            }
                        </div>
                    </div>
                </div>

                <div className = {`background ${ overlayColor ? 'overlay' : ''}`} 
                    style = {{ backgroundColor: overlayColor }}></div>
            </Button>
        </div>
    )
}