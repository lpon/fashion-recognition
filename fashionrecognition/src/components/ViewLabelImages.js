import React, { Component } from "react";
import "../index.css";

class ViewLabelImages extends Component {
    constructor (props) {
        super(props);

        this.state = {
            label: "",
            images: [],
            image: null
        }

        this.handleDiscardImage = this.handleDiscardImage.bind(this);
        this.handleSaveImage = this.handleSaveImage.bind(this);
        this.setImages = this.setImages.bind(this);
      }

    handleSaveImage() { 
    }

    handleDiscardImage() { 
        this.state.images.shift();
        this.setState({image: this.state.images[0]});
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.lable}</h1>
                <button>Save Image</button>
                <button onClick={this.handleDiscardImage}>Discard Image</button>
                <img src={this.state.image} alt=""/>
            </div>
        );
    }
}

export default ViewLabelImages;