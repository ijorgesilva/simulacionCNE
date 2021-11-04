import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import SwiperCore, { Virtual, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './onboard.scss'

// install Swiper modules
SwiperCore.use( [ Virtual, Pagination, Navigation ] )

export default function OnBoard ( 
    {
        className,
        title,
        noticeMessage,
        pages,
        cardStyle,
        show,
        onHide,
        fullScreen,
        slides,
    } 
) {

    const [swiperRef, setSwiperRef] = useState(null)
    
    const slideToSlide = (index) => () => {
        swiperRef.slideTo(index - 1, 0)
    }

    return (
        <Modal 
            className       = {`onboard ${ className ? className : ''} ${ fullScreen ? 'fullscreen' : ''}`}
            show            = { show }
            onHide          = { onHide }
            size            = 'xl'
            aria-labelledby = 'contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {/* Carousel Onboarding */}
                
                    {
                        slides?.length > 0 ?
                            <Swiper 
                                onSwiper        = { setSwiperRef }
                                className       = 'slider'
                                navigation      = { true } 
                                pagination      =   {{
                                                        'type': 'progressbar'
                                                    }} 
                                virtual
                            >
                                {
                                    slides.map( ( _, index ) => (
                                        index === 0 ?
                                            <SwiperSlide
                                                key             = { _.title }
                                                virtualIndex    = { index }
                                            >
                                                <div className = 'content'>
                                                    <h3 dangerouslySetInnerHTML={{ __html: _.title }}></h3>
                                                    <div dangerouslySetInnerHTML={{ __html: _.text }}></div>
                                                    <div className = 'btn-list'>
                                                        <Button 
                                                            variant     = 'unset'
                                                            className   = 'secondary' 
                                                            onClick     = { onHide }
                                                            title       = { 'Saltar' }
                                                        >
                                                            Saltar
                                                        </Button>
                                                        <Button 
                                                            variant     = 'outline-dark'
                                                            className   = 'help' 
                                                            onClick     = { slideToSlide( index + 2) }
                                                            title       = { 'Siguiente' }
                                                        >
                                                            Siguiente
                                                        </Button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        :
                                            index + 1 === slides.length ?
                                                <SwiperSlide>
                                                    <div className = 'content'>
                                                        <h3 dangerouslySetInnerHTML={{ __html: _.title }}></h3>
                                                        <div dangerouslySetInnerHTML={{ __html: _.text }}></div>
                                                        <div className = 'btn-list'>
                                                            <Button 
                                                                variant     = 'unset'
                                                                className   = 'secondary' 
                                                                onClick     = { slideToSlide( index - 2) }
                                                                title       = { 'Siguiente' }
                                                            >
                                                                Anterior
                                                            </Button>
                                                            <Button 
                                                                variant     = 'success'
                                                                className   = 'help' 
                                                                onClick     = { onHide }
                                                                title       = { 'Cerrar' }
                                                            >
                                                                Comenzar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            :
                                                <SwiperSlide>
                                                    <div className = 'content'>
                                                        <h3 dangerouslySetInnerHTML={{ __html: _.title }}></h3>
                                                        <div dangerouslySetInnerHTML={{ __html: _.text }}></div>
                                                        <div className = 'btn-list'>
                                                            <Button 
                                                                variant     = 'unset'
                                                                className   = 'secondary' 
                                                                onClick     = { slideToSlide( index - 2) }
                                                                title       = { 'Siguiente' }
                                                            >
                                                                Anterior
                                                            </Button>
                                                            <Button 
                                                                variant     = 'outline-dark'
                                                                className   = 'help' 
                                                                onClick     = { slideToSlide( index + 2) }
                                                                title       = { 'Siguiente' }
                                                            >
                                                                Siguiente
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>

                                    ))
                                }
                            </Swiper>
                        : undefined
                    }
                {/* END Carousel Onboarding */}   
            </Modal.Body>
        </Modal>
    )
}