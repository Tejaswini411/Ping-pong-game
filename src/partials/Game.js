import {SVG_NS ,PADDLE_HEIGHT,PADDLE_WIDTH,PADDLE_GAP,PADDLE_GAP2, KEYS, BALL_RADIUS, PADDLE_SPEED, TEXT_SIZE, MAX_SCORE} from '../settings';
import Board from './Board';
import Paddle from './Paddle' ;
import Ball from './Ball';
import Score from './Score';

export default class Game 
{
  constructor(element, width, height) 
  {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board= new Board(this.width, this.height);
    this.pressedKeys = [];
    this.gameInit = false;
    this.gameEnded = false;
    const checkGameInit = (key) => {
      if (!this.gameInit && Object.values(KEYS).indexOf(key) !== -1) {
        this.gameInit = true;
        this.ball.ballMove();
      }
    }
    const paddle1onKeyPressed = (key) => {
      checkGameInit(key);
      this.pressedKeys[key] = true;
      this.paddle1.movePaddle(this.pressedKeys);
    };

    const paddle1onKeyReleased = (key) => {
      this.pressedKeys[key] = false;
      this.paddle1.movePaddle(this.pressedKeys);
    };

    const paddle2onKeyPressed = (key) => {
      checkGameInit();
      this.pressedKeys[key] = true;
      this.paddle2.movePaddle(this.pressedKeys);
    };

    const paddle2onKeyReleased = (key) => {
      this.pressedKeys[key] = false;
      this.paddle2.movePaddle(this.pressedKeys);
    };

    this.paddle1 = new Paddle(PADDLE_WIDTH,
                                PADDLE_HEIGHT,
                                this.height,
                                PADDLE_GAP,
                                (this.height/2) - (PADDLE_HEIGHT/2),
                                KEYS.p1Up,
                                KEYS.p1Down,
                                paddle1onKeyPressed,
                                paddle1onKeyReleased,
                                'blue');
    this.paddle2 = new Paddle(PADDLE_WIDTH,
                                PADDLE_HEIGHT,
                                this.height,
                                this.width-PADDLE_WIDTH-PADDLE_GAP,
                                (this.height/2) - (PADDLE_HEIGHT/2),
                                KEYS.p2Up,
                                KEYS.p2Down,
                                paddle2onKeyPressed,
                                paddle2onKeyReleased,
                                'red');

    this.ball= new Ball(BALL_RADIUS, this.width, this.height, () => {
      this.gameEnded = true;
      document.getElementById('heading').innerText = this.paddle1.getScore() === MAX_SCORE ? "BLUE WINS!" : "RED WINS!"
      document.getElementById('heading').className = "blinking";
    });

    this.score1 = new Score(this.width/2 -50, 30, TEXT_SIZE);

    this.score2 = new Score(this.width/2 +25, 30, TEXT_SIZE);

    this.paused = false;
    document.addEventListener("keydown", event =>  {
      if (event.key === KEYS.pause) {
        this.paddle1.setSpeed(PADDLE_SPEED);
        this.paddle2.setSpeed(PADDLE_SPEED);
        this.paused = !this.paused;
      }
    });


    // Other code goes here...
  }

  render()
   {
    if (this.paused) {
      this.paddle1.setSpeed(0);
      this.paddle2.setSpeed(0);

      return;
    }
    // More code goes here....
    this.gameElement.innerHTML='';


     let svg = document.createElementNS(SVG_NS, "svg");
       svg.setAttributeNS(null, "width", this.width);
       svg.setAttributeNS(null, "height", this.height);
       svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
       this.gameElement.appendChild(svg);

       this.board.render(svg);
       this.paddle1.render(svg);
       this.paddle2.render(svg);
       this.ball.render(svg,this.paddle1,this.paddle2);
       this.score1.render(svg,this.paddle1.getScore());
       this.score2.render(svg,this.paddle2.getScore());
       if (this.gameInit && !this.gameEnded) {
        this.ball.ballMove();
      }
  }
}
