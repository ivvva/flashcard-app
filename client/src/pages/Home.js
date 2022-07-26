import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import css from '../assets/css/home.css'
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import bg1 from '../assets/bg1.png'
import main from '../assets/main.png'


export default function Home() {
	return (<>
		<nav>
		<Link to='/'>
		<img src={logo} href/> 
		</Link>
		<div className='link-container'>
		<a href='/login' className='login-btn'>Log In</a>
		<a href='/signup' className='signup-btn'>Sign Up</a>
		</div>
		</nav>

		<article>
		<div className='img-container'>
		<img className='main-img' src={main}/>
		<img className='bg-img' src={bg1}/>
		</div>
		<h2>Learn the smart way.</h2>
		</article>
		</>
	)
}