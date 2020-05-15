import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
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
			route: 'signin'
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
	console.log(box)
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

onRouteChange = () =>
this.setState({route: 'home'})

render(){
 	 return (
	    <div className="App">
	    <Particles className='particles'
                params={particlesOptions}
                />
		    <Navigation />
		    { this.state.route === 'signin'  
		    ? <SignIn onRouteChange = {this.onRouteChange}/>
		    : <div> 
		    <Logo />
			<Rank />
			<ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition box = {this.state.box} imageURL = {this.state.imageURL} />
		  </div>
		  }
	    </div>
	  );
	}
}
export default App;
