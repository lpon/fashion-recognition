import React, { Component } from "react";
import "../index.css";

class ImageCollection extends Component {
    constructor (props) {
        super(props);

        this.state = {
            region: "",
            item: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.setImages = this.setImages.bind(this);
      }

    setImages() { 
        return [];
    }

    handleRegionChange(event) {
        this.setState({region: event.target.value});
    }

    handleItemChange(event) {
        this.setState({item: event.target.value});
    }

    handleSubmit(e) { 
        // console.log(this.state.region);
        // console.log(this.state.item);
        const label = "./" + this.state.region + "-" + this.state.item;
        console.log("images");
        console.log("rerouting to view label images:", label);
        var image_urls = this.setImages();
        // redirect to the view label image page
        this.props.history.push({ 
            pathname: label,
            state: {data: {image_urls}}
          }); 
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
            </div>
        );
    }
}

export default ImageCollection;