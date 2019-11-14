import { SVG_NS, PADDLE_SPEED } from '../settings';

export default class Paddle {
  constructor(width, height, boardHeight, x, y, upKey, downKey, onKeyPressedCallBack, onKeyReleasedCallBack, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.boardHeight = boardHeight;
    this.score = 0;
    this.speed = PADDLE_SPEED;
    this.upKey = upKey;
    this.downKey = downKey;
    this.color = color;

    document.addEventListener("keydown", event => onKeyPressedCallBack(event.key));
    document.addEventListener("keyup", event => onKeyReleasedCallBack(event.key));
  }

  movePaddle(keys){
    if(keys[this.upKey]) {
      this.moveUp();
    }
    if(keys[this.downKey]) {
      this.moveDown();
    }
  }

  moveUp() {
    this.y = Math.max(0, this.y - this.speed);
    // this.y = this.y - this.speed;

  }


  moveDown() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  increaseScore() {
    this.score = this.score + 1;
  }
  getScore() {
    return this.score;
  }


  setSpeed(speed) {
    this.speed = speed;
  }

  getCoordinates() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height

    };
  }
  
  shaking() {
    this.x -= 5;
    setTimeout(() => {
      this.x += 5;
    }, 50);

    setTimeout(() => {
      this.x -= 5;
    }, 150);

     setTimeout(() => {
      this.x += 5;
    }, 200);

  }

  render(svg) {
    //...
    const paddle = document.createElementNS(SVG_NS, "rect");
    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);
    paddle.setAttributeNS(null, "fill", this.color);

    svg.appendChild(paddle);


  }
}