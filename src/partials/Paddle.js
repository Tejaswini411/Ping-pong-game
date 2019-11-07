import{SVG_NS } from '../settings';

export default class Board {
  constructor(width, height, boardHeight, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.boardHeight = boardHeight;
    this.score = 0;
    this.speed = 10;


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