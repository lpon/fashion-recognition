import React, { Component } from "react";
import "../index.css";
import Lightbox from "react-images";


const GoogleImages = require("google-images");

class ImageCollection extends Component {
    constructor (props) {
        super(props);

        this.state = {
            directory: "",
            region: "",
            item: "",
            images: [{src: "https://cdn.shopify.com/s/files/1/1778/1697/products/1_7dd5c8b3-54c7-4cff-a95c-3df95fb1b736_1024x1024.jpg?v=1490346159"}]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.setImages = this.setImages.bind(this);

      }

    setImages() { 
        const CSE_ID = "012272072441038669226:f7xo9kel91m";
        const API_KEY = "AIzaSyCRkb9N2qYMc-6mQd_WXazO0Prl1c8o14g";
        const client = new GoogleImages(CSE_ID, API_KEY);
        const fashion = this.state.region + "fashion" + this.state.item;

        client.search(fashion, {page: 1})
            .then(images => {
                /*
                [{
                    "url": "http://steveangello.com/boss.jpg",
                    "type": "image/jpeg",
                    "width": 1024,
                    "height": 768,
                    "size": 102451,
                    "thumbnail": {
                        "url": "http://steveangello.com/thumbnail.jpg",
                        "width": 512,
                        "height": 512
                    }
                }]
                */
               console.log(images);
            });
        // set this.state.images to parsed data
        
    }

    handleDirectoryChange(event) {
        this.setState({directory: event.target.value});
    }

    handleRegionChange(event) {
        this.setState({region: event.target.value});
    }

    handleItemChange(event) {
        this.setState({item: event.target.value});
    }

    handleSubmit(e) { 
        console.log("Fetching images for", this.state.region, "fashion", this.state.item);
        this.setImages();
    }
    
    render() {

        return (
            <div>
                <h2>Image Collection</h2>
                <br/><br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input 
                        type="text" 
                        value={this.state.directory}
                        onChange={this.handleDirectoryChange} 
                        />
                        Select a directory 
                    </label>
                    <br/><br/>
                    <label>
                        <input 
                        type="text" 
                        value={this.state.region}
                        onChange={this.handleRegionChange} 
                        />
                        Enter a region (e.g., "korea")
                    </label>
                    <br/><br/>
                    <label>
                        <input 
                        type="text" 
                        value={this.state.item}
                        onChange={this.handleItemChange} 
                        />
                        Enter an item of clothing (e.g., "skirt", "pants")
                    </label>
                    <br/><br/>
                    <input type="submit" value= "Submit"/>
                </form> 
                
                {/* <Grid imagesArray={this.state.images} onClick={this.openLightbox.bind(this)} columns={3} padding={3} /> */}
 
                {/* <Lightbox
                images={[{src: "https://cdn.shopify.com/s/files/1/1778/1697/products/1_7dd5c8b3-54c7-4cff-a95c-3df95fb1b736_1024x1024.jpg?v=1490346159"}, {src: "https://cdn.shopify.com/s/files/1/1778/1697/products/1_7dd5c8b3-54c7-4cff-a95c-3df95fb1b736_1024x1024.jpg?v=1490346159"}]}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeLightbox}
                /> */}
            </div>
        );
    }
}

export default ImageCollection;