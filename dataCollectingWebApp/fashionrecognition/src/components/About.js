import React, { Component } from "react";
import '../index.css';

class About extends Component {
  render() {
    return (
      <div>
        <h2>About Fashion Recognition</h2>
        <p>
            My name is Lia Pon. I am currently in my 3rd year of the 
            Computer Science Specialist program at the University of 
            Toronto.
            <br/>
            <br/>
            Fashion Recognition is a deep learning tool that takes
            data from Instagram and trains a neural net using Computer Vision
            in order to extract similarties in fashion trends depending on what
            geographical region the data was collected from.
            <br/>
            <br/>
            Please go to the <b>Image Collection</b> page to search for images
            and save them to your local machine. Once you have gathered enough data, 
            please go to the <b>Generate Trends</b> page to test it out. 
        </p>
      </div>
    );
  }
}
 
export default About;