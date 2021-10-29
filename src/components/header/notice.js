import React from 'react'
import  { 
            faExclamationCircle
        } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './notice.scss'

export default function Notice ( { text, showIcon } ) {
    return (
        <>
            {
                text ?
                    <div className = 'notice' >
                        <p> 
                            {
                                showIcon ?
                                    <FontAwesomeIcon className='icon' icon={faExclamationCircle} size='lg'/>
                                : undefined
                            }
                            { text } </p>
                    </div>
                :
                    undefined
            }
        </>
    )
}