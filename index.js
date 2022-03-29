import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@mui/material/Button';
import rabbit from './images/usagyuuun.gif';

// class Square extends React.Component {
//
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

let myStorage = window.localStorage;
if (!myStorage.getItem('clicks')) {
    myStorage.setItem('clicks', 1);
}
console.log('clicks: ' + myStorage.getItem('clicks'));

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

function App(props) {
  return <Button variant="contained"
  // onClick={() => {
  //   myStorage.setItem('clicks', 0);
  //   console.log('clicks: ' + myStorage.getItem('clicks'));
  //   //re-render?
  // }
  onClick={props.onClick}
  >Reset Clicks</Button>;
}

function Iframe(props) {
  return(
    <div>
      <iframe
        src={this.props.src}
        height={this.props.height}
        width={this.props.width}
      > </iframe>
    </div>
  );
}

class MyButton extends React.Component {
  colorBlue = "blue";

  constructor(props) {
    super(props);
    this.state = {
      desc: 'Click me!',
      myColor: '',
      getColor: function(someColor) {
        if (this.myColor === someColor) {
          this.myColor = '';
        } else {
          this.myColor = someColor;
        }
      }
    };
  }

  render() {
    return (
      <button className="button" style={{background: this.state.myColor}}
      onClick={() => this.setState({desc: this.state.desc + '!', background: this.state.getColor('blue')})}>
      {this.state.desc}</button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(16).fill(null),}],
      stepNumber: 0,
      xIsNext: true,
      clickCounterDesc: 'We are on click '
        + myStorage.getItem('clicks')
        + '. This is a run on sentence. The quick brown fox jumps over the lazy dog.',
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    myStorage.setItem('clicks', parseInt(myStorage.getItem('clicks')) + 1);
    console.log('clicks: ' + myStorage.getItem('clicks'));
    squares[i] = this.state.xIsNext? "X" : "O";
    this.setState({
      history: history.concat([{squares: squares,}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      clickCounterDesc: 'We are on click '
        + myStorage.getItem('clicks')
        + '. This is a run on sentence. The quick brown fox jumps over the lazy dog.',
    });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2)===0,
    });
  }

  resetClicks() {
      myStorage.setItem('clicks', 0);
      console.log('clicks: ' + myStorage.getItem('clicks'));
      this.setState({
        clickCounterDesc: 'We are on click '
        + myStorage.getItem('clicks')
        + '. This is a run on sentence. The quick gray fox jumped over the lazy brown dog.',
      });
  }

  render() {
   const history = this.state.history;
   const current = history[this.state.stepNumber];
   const winner = calculateWinner(current.squares);

   const moves = history.map((step, move) => {
         const desc = move ?
           'Go to move #' + move :
           'Go to game start';
         return (
           <li key={move}>
             <button onClick={() => this.jumpTo(move)}>{desc}</button>
           </li>
         );
       });


   let status;
   if (winner) {
     status = 'Winner: ' + winner;
   } else if (this.state.stepNumber >= 16) {
     status = 'Tie'
   } else {
     status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
   }

   return (
     <div className="game">
       <div className="game-board">
         <Board
           squares={current.squares}
           onClick={(i) => this.handleClick(i)}
         />
            <h1>{this.state.clickCounterDesc}</h1>
            <MyButton/>
            <br/>
            <br/>
            <App onClick={() => this.resetClicks()}/>
            <br/>
            <img src={rabbit} alt={"Me after a long day of work."}/>
            <br/>
            <br/>
       </div>
       <div className="game-info">
         <div>{status}</div>
         <ol>{moves}</ol>
       </div>
     </div>
   );
 }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
