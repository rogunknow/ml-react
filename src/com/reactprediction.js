import React from "react";
import ReactDOM from "react-dom";

import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import "./styles.css";


// the link to your model locally or the link from Teachable Machines
const URL = "https://teachablemachine.withgoogle.com/models/1i-PksT3o/";
let model,
webcam,
labelContainer,
maxPredictions,
key = 0,
value1 = "",
value2 = 0;
let classPrediction = "";

// Load the image model and setup the webcam
async function init() {
console.log("start button is pressed !!!");
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
setTimeout(function() {
  document.getElementById("result").style.visibility = "visible";
}, 2000);
// load the model and metadata
// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
// or files from your local hard drive
// Note: the pose library adds "tmImage" object to your window (window.tmImage)
model = await tmImage.load(modelURL, metadataURL);
maxPredictions = model.getTotalClasses();

// Convenience function to setup a webcam
const flip = true; // whether to flip the webcam
webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
await webcam.setup(); // request access to the webcam
await webcam.play();
window.requestAnimationFrame(loop);

// append elements to the DOM
document.getElementById("webcam-container").appendChild(webcam.canvas);
labelContainer = document.getElementById("label-container");
for (let i = 0; i < maxPredictions; i++) {
  // and class labels
  labelContainer.appendChild(document.createElement("div"));
}
}

async function loop() {
webcam.update(); // update the webcam frame
await predict();
window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
// predict can take in an image, video or canvas html element
const prediction = await model.predict(webcam.canvas);
for (let i = 0; i < maxPredictions; i++) {
  classPrediction =
    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //console.log(prediction[i].className);
  if (
    prediction[i].className == "Class 1" &&
    prediction[i].probability > 0.7
  ) {
    //	alert("Hello");
webcame.pause();
    document.getElementById("c1").innerHTML = classPrediction;
    key = 1;
    value1 = "Water bottle ---> Non-disposable Recycleable  Blue bin ";
    value2 = prediction[i].probability;
  } else if (
    prediction[i].className == "Class 2" &&
    prediction[i].probability > 0.7
  ) {
    document.getElementById("c1").innerHTML = classPrediction;
    key = 2;
    value1 = "Wraper --> Non-Disposable Recylable Blue bin";
    value2 = prediction[i].probability;
    //labelContainer.childNodes[i].innerHTML = classPrediction;
    //alert("class 2222");
  } else if (
    prediction[i].className == "Class 3" &&
    prediction[i].probability > 0.7
  ) {
    document.getElementById("c1").innerHTML = classPrediction;
    key = 3;
    value1 = "Paper  --> Disposable Recylable Green  bin";
    value2 = prediction[i].probability;
  }
}
}
function getresult() {
if (key == "1") {
  document.getElementById("result1").innerHTML = value2;
  document.getElementById("result2").innerHTML = value1;
} else if (key == "2") {
  document.getElementById("result1").innerHTML = value2;
  document.getElementById("result2").innerHTML = value1;
} else if (key == "3") {
  document.getElementById("result1").innerHTML = value2;
  document.getElementById("result2").innerHTML = value1;
} else {
  document.getElementById("result1").innerHTML = value2;
  document.getElementById("result2").innerHTML = value1;
}
}
