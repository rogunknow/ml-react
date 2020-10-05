import React from "react";
import init from './predict'
import Predict from './predict'
import * as tmImage from '@teachablemachine/image'
import '@tensorflow/tfjs'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <div id="webcam-container"></div>
            <div id="label-container"></div>
            <button type="button" onclick={init()}>Start</button>
         
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Home</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>

        </div>
      </div>
    </div>
    </div>
  );
}
 
export default About;

