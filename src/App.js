import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey: 'b01accfee0a4480793d1b1b09e0e4490'
});

const particlesOptions = {
	particles: {
		line_linked: {
			shadow: {
				enable: true,
				color: "#3CA9D1",
				blur: 5
			}
		}
	}
}
class App extends Component{
	constructor(){
		super();
		this.state = {
			input: ' ',
			imageURL: ' ',
			box: {},
			route: 'signin',
			isSignedIn: false,
		}
	}

calculateFaceLocation = (data) => {
	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
	const image = document.getElementById('inputImage');
	const width = Number(image.width);
	const height = Number(image.height);
	return {
		leftCol: clarifaiFace.left_col * width,
		topRow: clarifaiFace.top_row * height,
		rightCol: width - (clarifaiFace.right_col *width),
		bottomRow: height - (clarifaiFace.bottom_row * height),
	}
}


displayFaceBox = (box) => {
	this.setState({box: box});
}

onInputChange = (event) => {
	this.setState({input: event.target.value});
}

onButtonSubmit = () => {
	this.setState ({imageURL: this.state.input})
	app.models
.predict(
Clarifai.FACE_DETECT_MODEL,
    // URL
     this.state.input
)
.then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
}

onRouteChange = (route) =>{
	if (route === 'signout'){
		this.setState({isSignedIn: false})
	}else if (route === 'home'){
		this.setState({isSignedIn: true})
	}
	this.setState({route: route});
}


render(){
	const { isSignedIn, box, imageURL, route } = this.state;
 	 return (
	    <div className="App">
	    <Particles className='particles'
                params={particlesOptions}
                />
		    <Navigation  isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
		    { route === 'home'  
		    ? <div> 
		    <Logo />
			<Rank />
			<ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition box = {box} imageURL = {imageURL} />
		  </div>
		  : (
		  		route === 'signin' 
		  		?<SignIn onRouteChange = {this.onRouteChange}/>
		  		: <Register onRouteChange = {this.onRouteChange}/>
		  	)
		  
		  }
	    </div>
	  );
	}
}
export default App;
