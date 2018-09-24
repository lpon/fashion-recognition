import React, { Component } from "react";
import axios from 'axios';

import "../index.css";
// import { getImages, saveImage } from "../actions/ImageCollectionActions";

class ViewLabelImages extends Component {
    constructor (props) {
        super(props);

        this.state = {
            label: "",
            images: [],
            image: null,
        }
        this.handleDiscardImage = this.handleDiscardImage.bind(this);
        this.handleSaveImage = this.handleSaveImage.bind(this);
        this.setImages = this.setImages.bind(this);
        this.saveImage = this.saveImage.bind(this);

    }

    async setImages() { 
        console.log("Getting images...")
        var response;
        let data = JSON.stringify({
            label: this.state.label
        });
        await axios.post(
                            'http://127.0.0.1:8000/api/get-images/', 
                            data,
                            {headers: {'Content-Type': 'application/json'}}
        )
            .then(res => {
            response = res.data;
        })
        .catch(function (error) {
            response = "An error has occured";
        });
        console.log("Images recieved: ", response);
        this.setState({images: response.images});
        this.setState({image: this.state.images[0]});
    }

    async saveImage() { 
        console.log("Saving image...")
        var response;
        let data = JSON.stringify({
                        url: this.state.image, 
                        tags: this.state.label
                    });
        await axios.post(
                            'http://127.0.0.1:8000/api/save-image/', 
                            data, 
                            {headers: {'Content-Type': 'application/json'}}
        )
            .then(res => {
            response = res.data;
        })
        .catch(function (error) {
            response = "An error has occured";
        });
        this.setState({images: response.images});
    }
    
    componentWillMount() { 
        this.setState({label: this.props.location.state.data.label});
        this.setImages();
    }
    
    handleSaveImage() { 
        this.saveImage();
        this.state.images.shift();
        this.setState({image: this.state.images[0]});

    }

    handleDiscardImage() { 
        console.log("Discarding image...")
        this.state.images.shift();
        this.setState({image: this.state.images[0]});
    }
    
    render() {
        let img;

        if (this.state.images != null && this.state.images.length > 0) {
            img = <img src={this.state.images[0]} alt=""/>;
        } else {
            img = null;
        }
        return (
            <div>
                <h1>{this.state.label}</h1>
                <button onClick={this.handleSaveImage}>Save Image</button>
                <button onClick={this.handleDiscardImage}>Discard Image</button>
                <br/><br/>
                {img}
            </div>
        );
    }
}

export default ViewLabelImages;