import React from "react";
import * as tmImage from '@teachablemachine/image'
import '@tensorflow/tfjs'


const URL = "https://teachablemachine.withgoogle.com/models/Qj55aZpKc/";

let model, webcam, labelContainer, maxPredictions;

export  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

   
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { 
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); 
    let ans = await predict();
    if (!ans) {
      window.requestAnimationFrame(loop);
    }
  
    if ((ans === "you")) {
      console.log("par");
      window.location.href = "http://localhost:3000/"; 
    }
    else{
        console.log("darsh");
    }  
    console.log(window);
  }
  

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    console.log(prediction);
  
    let ans;
  
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
  
      if (prediction[i].probability.toFixed(2) > 0.9) {
        ans = prediction[i].className;
      }
    }
  
    return ans;
  }

function About() {
  return (
    <>
    <div>Image Model</div>
    <button onclick={init()}/>
<div id="webcam-container"></div>
<div id="label-container"></div>
   </>
  );
}

export default About;
