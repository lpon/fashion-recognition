import React, { Component } from "react";
import "../index.css";

class ImageCollection extends Component {
    constructor (props) {
        super(props);

        this.state = {
            dataSet: "all",
            region: "",
            item: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDataSetChange = this.handleDataSetChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }
    
    handleDataSetChange(event) {
        this.setState({dataSet: event.target.value});
    }

    handleRegionChange(event) {
        this.setState({region: event.target.value});
    }

    handleItemChange(event) {
        this.setState({item: event.target.value});
    }

    handleSubmit(e) { 
        const region = this.state.region.toLowerCase().trim()

        if (region === "") {
            alert("Please select a valid region")
        } else {
            const item = this.state.item.toLowerCase().trim()
            const label = "images/" + region + "-" + item;
            console.log("rerouting to view label images:", label);
            // redirect to the view label image page
            this.props.history.push({ 
                pathname: label,
                state: {
                            data: {
                                    label: region + " " + item, 
                                    // dataSet: this.state.dataSet
                                    }
                            }
              }); 
        }

    }
    
    render() {
        return (    
            <div>
                <h2>Image Collection</h2>
                <br/><br/>
                <form>
                    {/* <label>
                        <select onChange={this.handleDataSetChange}>
                            <option value="all">All</option>
                            <option value="training">Training</option>
                            <option value="test">Test</option>
                        </select>
                        Select which data set you would like to save your images
                    </label>
                    <br/><br/> */}

                    <label>
                    Select a region that you'd like to search for<br/>
                        <select onChange={this.handleRegionChange}>
                            <option value="">Select</option>
                            <option value="fashion instagram">America</option>
                            <option value="korean fashion">Korea</option>
                        </select>
                    </label>
                    <br/><br/>
                    <label>
                    Enter an item of clothing (e.g., "Skirt", "Pants")<br/>
                        <input 
                        type="text" 
                        value={this.state.item}
                        onChange={this.handleItemChange} 
                        />
                    </label>
                    <br/><br/>
                </form> 
                <button onClick={this.handleSubmit}>View Images</button>
            </div>
        );
    }
}

export default ImageCollection;