import React, { Component } from "react";
import axios from 'axios';
import LinkButton from './LinkButton'
import "../index.css";
// import { getImages, saveImage } from "../actions/ImageCollectionActions";

class ViewLabelImages extends Component {
    constructor (props) {
        super(props);
        
        this.count = 0;

        this.state = {
            label: "",
            images: [],
            image: null,
            returnToCollectMoreImages: false,
        }
        this.handleDiscardImage = this.handleDiscardImage.bind(this);
        this.handleSaveImage = this.handleSaveImage.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.setImages = this.setImages.bind(this);
        this.saveImage = this.saveImage.bind(this);

    }

    async setImages() { 
        var response;

        let data = JSON.stringify({
            label: this.props.location.state.data.label
        });
        console.log(data);
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
        this.setState({images: response.urls});
        this.setState({image: this.state.images[0]});
    }

    async saveImage() { 
        console.log(this.state.label);
        let data = JSON.stringify({
                        url: this.state.image, 
                        tags: this.state.label
                    });
        await axios.post(
                            'http://127.0.0.1:8000/api/save-image/', 
                            data, 
                            {headers: {'Content-Type': 'application/json'}}
        );
    }
    
    componentWillMount() { 
        this.setState({label: this.props.location.state.data.label});
        this.setImages();
    }
    
    handleSaveImage() { 
        this.saveImage();
        this.handleDiscardImage();
    }

    handleDiscardImage() { 
        if (this.state.images != null) {
            this.state.images.shift();
            this.setState({image: this.state.images[0]});
            this.count += 1;
        }
    }

    handleDone() {
        console.log(this.state.label);
        let data = JSON.stringify({
                        label: this.state.label,
                        count: this.count,
                    });
        axios.post(
                    'http://127.0.0.1:8000/api/set-current-page/', 
                    data, 
                    {headers: {'Content-Type': 'application/json'}}
        ).
        then(this.setState({ images: [] })).
        then(this.setState({ image: null })).
        then(this.setState({ label: "" })).
        then(this.setState({returnToCollectMoreImages: true}));
    }
    
    render() {
        let img;
        let back;
        let save;
        let discard;
        let done

        if (this.state.images != null && this.state.images.length > 0) {
            img = <img src={this.state.images[0]} alt=""/>;
        } else {
            img = null;
        }

        if (this.state.returnToCollectMoreImages === true) {
            back = <LinkButton to="/image-collection">Collect More Images</LinkButton>;
            save = null;
            discard = null;
            done = null;
        } else {
            back = null;
            save = <button onClick={this.handleSaveImage}>Save Image</button>
            discard = <button onClick={this.handleDiscardImage}>Discard Image</button>
            done = <button onClick={this.handleDone}>Done</button>
        }

        return (
            <div>
                <h1>{this.state.label}</h1>
                {save}
                {discard}
                {done}
                {back}
                <br/><br/>
                {img}
            </div>
        );
    }
}

export default ViewLabelImages;