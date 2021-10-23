import React from 'react'
import  { 
            faExclamationCircle
        } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './notice.scss'

export default function Notice ( { text } ) {
    return (
        <>
            {
                text ?
                    <div className = 'notice' >
                        <p> <FontAwesomeIcon className='icon' icon={faExclamationCircle} size='lg'/> { text } </p>
                    </div>
                :
                    undefined
            }
        </>
    )
}