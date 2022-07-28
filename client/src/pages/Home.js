import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from '../assets/css/home.css'
import logo from '../assets/logo.png'

import bg1 from '../assets/bg1.png'
import main from '../assets/main.png'


export default function Home() {
	return (<>
		<div className="navigate">
		<Link to='/'>
		<img src={logo} href/> 
		</Link>
		<div className='link-container'>
		<a href='/login' className='login-btn'>Log In</a>
		<a href='/signup' className={styles.signuplink}>Sign Up</a>
		</div>
		</div>

		<article>
		<div className='img-container'>
		<img className='main-img' src={main}/>
		<img className='bg-img' src={bg1}/>
		</div>
		</article>
		</>
	)
}