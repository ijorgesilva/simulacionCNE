import React, { useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SwiperCore, { Pagination,Navigation } from 'swiper'
import './onboard.scss'

// install Swiper modules
SwiperCore.use([Pagination,Navigation])

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
                                navigation      = {true} 
                                className       = 'mySwiper'
                                pagination      =   {{
                                                        'type': 'progressbar'
                                                    }} 
                            >
                                {
                                    slides.map( ( _, index ) => (
                                        index === 0 ?
                                            <SwiperSlide>
                                                <div className = 'content'>
                                                    <h3>{_.title}</h3>
                                                    <p>{_.text}</p>
                                                    <Button 
                                                        variant     = 'outline-dark'
                                                        className   = 'help onboard' 
                                                        onClick     = { onHide }
                                                        title       = { 'Saltar' }
                                                    >
                                                        Saltar
                                                    </Button>
                                                </div>
                                            </SwiperSlide>
                                        :
                                            index + 1 === slides.length ?
                                                <SwiperSlide>
                                                    <div className = 'content'>
                                                        <h3>{_.title}</h3>
                                                        <p>{_.text}</p>
                                                        <Button 
                                                            variant     = 'primary'
                                                            className   = 'help onboard' 
                                                            onClick     = { onHide }
                                                            title       = { 'Cerrar' }
                                                        >
                                                            Comenzar
                                                        </Button>
                                                    </div>
                                                </SwiperSlide>
                                            :
                                                <SwiperSlide>
                                                    <div className = 'content'>
                                                        <h3>{_.title}</h3>
                                                        <p>{_.text}</p>
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