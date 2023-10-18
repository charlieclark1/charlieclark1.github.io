
// creating refrences to values so that further in the js i am able to refrence them without having to go through getelementby etc.
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const button = document.getElementById('button1');// refrencing buttonn1 so its constantly called button rather than getting the id each time
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const changeBackgroundButton = document.getElementById('changeBackgroundButton'); //same for the background colour buttons
const changeBackgroundButton2 = document.getElementById('changeBackgroundButton2'); 
const particleSizeSlider = document.getElementById('particleSizeSlider');
//const speedXSlider = document.getElementById('speedXSlider');
//const speedYSlider = document.getElementById('speedYSlider');

// The hue is set to 'let' because it is interchangeable further in the js, and changes with mousemovement and values set.
// when using the HSL colour i am able to interchange the colours through the let function changing the hue, saturation and lighting.
//let hue = 0;
let selectedColor = 'turquoise';
let particleSize = 7.5;
//let speedX = Math.random() * 3 - 1.5;// i two of these allowing for sliders that could change x and y speeds
//let speedY = Math.random() * 3 - 1.5;

// This event listener helps with webpage resizing issues and not stretching whatever is made, allowing it to resize with browser movement.
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
});
const mouse = {
    x: undefined,
    y: undefined,
}

particleSizeSlider.addEventListener('input', function() {
    // i am getting the current value of the slider and update the particle size
    particleSize = parseFloat(particleSizeSlider.value);
});

// the event listener for the sliders to change the x and y particle flow system, however it did not function as intended.
//speedXSlider.addEventListener('input', function() {
   // speedX = parseFloat(speedXSlider.value);
//});

//speedYSlider.addEventListener('input', function() {
  //  speedX = parseFloat(speedYSlider.value);
//});



// adding an event listener for when the user clicks on the canvas, in order to greate and dispearse 500 particles
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 500; i++){
        particlesArray.push(new Particle(particleSize));
    }
});
// addding an event listener so that when the user moves the mouse particles are created on movement.
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 1; i++){
        particlesArray.push(new Particle(particleSize));
    }
})
// this allows the particles to be created, and then allows me to randomize the distance, speed and size of the particles
// i am defining the lengths of the randomness using Math (source:html5 canvas crash course- franks laboratory(youtube))
class Particle {
    constructor(size){
       this.x = mouse.x;
       this.y = mouse.y;
       //this.x = Math.random() * canvas.width;
       //this.y = Math.random() * canvas.height;
       //this.size determines hwo big the size of the circles can be from 1-40 according to the slider
       this.size = size;// the size is unchosen so that in my function i am able to allow the slider to change it, with the default value being 7.5.
       this.speedX = Math.random() * 3 - 1.5;
       this.speedY = Math.random() * 3 - 1.5;
       this.color = selectedColor;
       
    }
    update(){// allowing the particle class to update and change according to size of the particles and speed
       this.x += this.speedX;
       this.y += this.speedY;
       if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){// this function chooses what to draw, for example ive got stroke and strokestyle but instead it could be fill in which case the particles would always be full
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}
// the handle particles function operates the size and falloff of the particles as they get smaller through the splice, replacing elements
function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);// replacing existing elements with new ones throguh splice
            i--;// the particles slowly get smaller
        }
    }
}
// fucntion to change the background colour for the white button
function changeBackgroundColorToWhite() {
    canvas.style.backgroundColor = 'white'; // defining colour here
  }
 changeBackgroundButton.addEventListener('click', changeBackgroundColorToWhite);

// fucntion to change the background colour for the black button
  function changeBackgroundColorToBlack() {
    canvas.style.backgroundColor = 'black'; //defining colour here
  }
  changeBackgroundButton2.addEventListener('click', changeBackgroundColorToBlack);// the event listener checks for when the button is pressed, and then calls the action in order to change the colour

  
// i have added theese buttons in order to make use for the user easier, including a reset canvas, red, turquiouse, and pink button for the particles to change
// i have also added the black and grey buttons to be able to change the background colour minimally.
// each function creates the action of what i am aiming for, and the event listener allows this to take place by listening for the button to be clicked.
//function to reset
function resetCanvas() {
    particlesArray.length = 0; // Clear the particles array
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  }
// an eventlistener to allow me to reset canvas
  button.addEventListener('click', resetCanvas);
  
//function to change the colour to red
  function changeParticleColorR() {
    selectedColor = 'red'; // Update the selected color
    for (let i = 0; i < 500; i++) {
        particlesArray.push(new Particle());
    }
}
//adding an eventlistener for when the pink button is clicked
  button2.addEventListener('click', changeParticleColorR);
//function to change the colour to pink through the button
  function changeParticleColorP() {
    selectedColor = 'pink'; // Update the selected color
    for (let i = 0; i < 500; i++) {
        particlesArray.push(new Particle());
    }
}
//adding an eventlistener for when the pink button is clicked
  button3.addEventListener('click', changeParticleColorP);
//function to change the colour to turquioise
  function changeParticleColorT() {
    selectedColor = 'turquoise'; // Update the selected color
    for (let i = 0; i < 500; i++) {
        particlesArray.push(new Particle());
    }
}
// event listener so when the button4 is clicked the particl colour changes to turquioise
button4.addEventListener('click', changeParticleColorT);
  


  
  


// creating an animate function that allows the page to either be cleared after 'click' or mousemove, or to leave trails using the rgba
// color to lower the saturation and keep the particles and their colour visible after this.
// i have kept both in so that it is interchangeable with just commenting iin and out.
function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.007';// adding this slight alpha increase, i am unable to take make the background white as originally intended
    //but i am able to make it slightly grey and thus creating a 3d effect as the particles become smaller and more opaque
    //as you can see when mouse moving or clicking for a little bit it looks as if they become 3d and make cool patterns.
    // i have decided to choose grey over just black or white because i prefer the acess to the 3d look for the user.
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //hue+=0;
    requestAnimationFrame(animate);
}
//telling the above animate function to run
animate();































