import './Header.css'
import React from 'react'

export default function Header(props) {
  return (
    <div className='Headermain'>
       <p>{props.title}</p>
    </div>
  )
}
