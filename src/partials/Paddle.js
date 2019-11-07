import{SVG_NS } from '../settings';

export default class Paddle {
  constructor(width, height, boardHeight, x, y,upKey, downKey) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.boardHeight = boardHeight;
    this.score = 0;
    this.speed = 10;
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case upKey:
            this.moveUp();
          break;

        case downKey:
            this.moveDown();
          break;


      }
    });
  }

moveUp()
    { 
    this.y =  Math.max(0, this.y - this.speed);
   // this.y = this.y - this.speed;


}


moveDown()
     { 
       this.y =  Math.min(this.boardHeight - this.height, this.y + this.speed);
  

}



  
  render(svg) {
    //...
    const paddle = document.createElementNS(SVG_NS, "rect");
    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);
    paddle.setAttributeNS(null, "fill", "white");

    svg.appendChild(paddle);
   

  }
}