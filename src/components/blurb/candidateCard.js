import React from 'react'
import { Button } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'

import './candidateCard.scss'

export default function CandidateCard ( 
    { 
        contextClass,
        className, 
        style,
        // Logic
        status,
        onClick,
        layoutType,
        // Candidato
        photo,
        name,
        linkText,
        // Partido
        overlayColor,
        title,
        logo,
        poster,
        
    } 
) {
    
    switch(status){
        case 'unset': {
            return (
                <div className =  {`candidateCard card unset ${ className ? className : ''} ${ contextClass ? contextClass : ''}`} style = { style }>
                    <Button 
                        variant     = 'none'
                        onClick     = { onClick }
                        title       = {`${ linkText ? linkText : 'Seleccionar Candidato'}`}
                        className   = {`card-body link ${ layoutType ? layoutType : 'list'}`}
                    >
                        <div className='main'>
                            <h3>Opción sin <br/>seleccionar</h3>
                        </div>
                        <div className = {`background ${ overlayColor ? 'overlay' : ''}`}></div>
                    </Button>
                </div>
            )
        }
        case 'void': {
            return (
                <div className =  {`candidateCard card void ${ className ? className : ''} ${ contextClass ? contextClass : ''}`} style = { style }>
                    <Button 
                        variant     = 'none'
                        onClick     = { onClick }
                        title       = {`${ linkText ? linkText : 'Seleccionar Candidato'}`}
                        className   = {`card-body link ${ layoutType ? layoutType : 'list'}`}
                    >
                        <div className='main'>
                            <h3>Nulo</h3>
                        </div>
                        <div className = {`background ${ overlayColor ? 'overlay' : ''}`}></div>
                    </Button>
                </div>
            )
        }
        case 'publish': {
            return (
                <div className = {`candidateCard card publish ${ className ? className : ''} ${ contextClass ? contextClass : ''}`} style = { style }>
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
                                            objectFit       = 'cover'
                                            objectPosition  = 'center center'
                                        />
                                    : undefined
                                }
                            </div>
                            <div className={`information`}>
                                <div className={`party`}>
                                    {
                                        poster ?
                                            <GatsbyImage
                                                className       = { 'poster' }
                                                image           = { poster }
                                                objectFit       = { 'contain' }
                                                alt             = { title }
                                            />
                                        : 
                                            logo ?
                                                <GatsbyImage
                                                    className       = { 'logo' }
                                                    image           = { logo }
                                                    objectFit       = { 'contain' }
                                                    alt             = { title }
                                                />
                                            : 
                                                <span> {title} </span>
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
        
                        <div className = {`background ${ overlayColor ? 'overlay' : ''}`} style = {{ backgroundColor: overlayColor }}></div>
                        
                    </Button>
                </div>
            )
        }
        default: {
            return <></>
        }

    }
}