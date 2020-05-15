import React from 'react';
import './Logo.css';
import brain from './brain.png';
import Tilt from 'react-tilt'

const Logo = () => {
	return (
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 100  }} style={{ height: 150, width: 150 }} >
	 		<div className="Tilt-inner pa3"> <img style={{paddingTop: "20px"}} alt ="logo" src={brain} /> </div>
			</Tilt>
		</div>
		);
}

export default Logo;