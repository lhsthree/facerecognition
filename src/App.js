import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
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
		}
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
.then(function(response) {
    // do something with responseconsole.log(response);
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {// there was an error
    }
);
}


render(){
 	 return (
	    <div className="App">
	    <Particles className='particles'
                params={particlesOptions}
                />
		    <Navigation />
			<Logo />
			<Rank />
			<ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			<FaceRecognition imageURL = {this.state.imageURL} />
	    </div>
	  );
	}
}
export default App;
