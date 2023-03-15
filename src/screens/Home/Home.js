import './Home.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header/Header'
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header>
       <Header title={'Home Page'}/>
      </header>
    <div className='main'>
      <Link to={'/create'}>
      <Button variant="primary">Create Collection</Button>
      </Link>
      <Link to={'/crud'}>
      <Button variant="primary">Crud Collection</Button>
      </Link>
      <Link to={'/post'}>
      <Button variant="primary">Post Collection</Button>
      </Link>
      <Link to={'delete'}>
      <Button variant="primary">Delete Collection</Button>
      </Link>
      <Link to={'view'}>
      <Button variant="primary">View Collection</Button>
      </Link>
      <Link to={'viewall'}>
      <Button variant="primary">View All Collection</Button>
      </Link>
      <Link to={'example'}>
      <Button variant="primary">Example</Button>
      </Link>
    </div>
    </div>
  )
}
