let $eyes = document.querySelectorAll(".c-truth__eye");
let $head = document.querySelector(".c-truth");

class Eye {
 constructor($eye, $head) {
  this.$container = $eye;
  this.$parent = $head;
  this.containerBounderies = this.$container.getBoundingClientRect();
  this.isStart = true;
  this.setIdle();
 }

 setPupil(x, y) {
   let clamp = function(min, value, max) {
    return Math.min(Math.max(value, min), max);
   };
  
   if(!this.isStart)
    this.$container.classList.remove('c-truth__eye--idle');
  
   this.isStart = false;
   const containerBounderies = this.$container.getBoundingClientRect();
   const parentBounderies = this.$parent.getBoundingClientRect();
  
   const xCenter = parentBounderies.x + (parentBounderies.width / 2);
   const yCenter = parentBounderies.y + (parentBounderies.height / 2);
   
  
   let xLimit = x <= xCenter ? xCenter : window.innerWidth; 
   let yLimit = y <= yCenter ? yCenter : window.innerHeight;
  
   const xTranslate = clamp(4, (x * (this.containerBounderies.width / 2)) / xCenter, this.containerBounderies.width - 4);
   const yTranslate = clamp(4, (y * (this.containerBounderies.height / 2)) / yCenter, this.containerBounderies.height - 4);
  
   this.$container.style.setProperty("--axis-x", xTranslate + "px");
   this.$container.style.setProperty("--axis-y", yTranslate + "px");
  
   
 }
 
 setIdle() {
   this.$container.classList.add('c-truth__eye--idle');
   this.$container.style.setProperty("--axis-x", this.containerBounderies.width / 2 + "px");
   this.$container.style.setProperty("--axis-y",  this.containerBounderies.height / 2 + "px");
 }
}

const eye = [];
eye[0] = new Eye($eyes[0], $head);
eye[1] = new Eye($eyes[1], $head);
let lastTimestamp = Date.now();

window.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
 setTimeout(function () {
  eye[0].setPupil(event.clientX, event.clientY);
  eye[1].setPupil(event.clientX, event.clientY);
  lastTimestamp = Date.now();
 }, 50);
}

setInterval(checkMouseMovement, 3000);

function checkMouseMovement() {
 if((Date.now() - lastTimestamp) > 40) {
  eye[0].setIdle();
  eye[1].setIdle();
 }
}
