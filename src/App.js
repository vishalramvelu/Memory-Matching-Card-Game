import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Full implementation for memory card project

function MemoryCardGame() {
  // State variables
  const [cards, setCards] = useState([]);
  const [positions, setPositions] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [cardPair, setCardPair] = useState([]);
  const [tryCount, setTryCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [boardSize, setBoardSize] = useState(2); // Initial board size: 2x2

  const number_of_cards = boardSize * boardSize; // Ensure 2-dimensional grid with same rows and cols

  useEffect(() => {
    // Initialize the game when the board size changes
    initializeGame();
  }, [boardSize]);


  const initializeGame = () => {
    // Initialize the game state
    const numbers_list = makeRandomNumberList(number_of_cards);
    const positions = shufflePositions(generatePositions());


    setCards(numbers_list);
    setPositions(positions);
    setDisplayedCards(new Array(number_of_cards).fill('*'));
    setCardPair([]);
    setTryCount(0);
    setMatchCount(0);
    setGameOver(false);
    setTimer(0);
  };

  // Choose numbers through a random process
  const makeRandomNumberList = (count) => {
    const numbers = Array.from({ length: count / 2 }, (_, index) => index + 1);
    const numbers_list = [...numbers, ...numbers];
    for (let i = numbers_list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers_list[i], numbers_list[j]] = [numbers_list[j], numbers_list[i]];
    }
    return numbers_list;
  };


  // Generate positions for the cards
  const generatePositions = () => {
    const positions = [];
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        positions.push({ x, y });
      }
    }
    return positions;
  };

  // Randomize the positions
  const shufflePositions = (positions) => {
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return positions;
  };


  const handleCardClick = (index) => {
    // Handle card click event
    if (displayedCards[index] !== '*') {
      return;
    }

    if (cardPair.length === 0) {
      // First card in a pair
      setCardPair([index]);
      setDisplayedCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[index] = cards[index].toString();
        return updatedCards;
      });
    } else if (cardPair.length === 1) {
      // Second card in a pair
      setCardPair((prevPair) => [...prevPair, index]);
      setDisplayedCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[index] = cards[index].toString();
        return updatedCards;
      });

      if (cards[cardPair[0]] === cards[index]) {
        // Match found
        setMatchCount((prevCount) => prevCount + 1);
        if (matchCount + 1 === number_of_cards / 2) {
          setGameOver(true);
        }
        setCardPair([]);
      } else {
        // No match, flip the cards back
        setTimeout(() => {
          setDisplayedCards((prevCards) => {
            const updatedCards = [...prevCards];
            updatedCards[cardPair[0]] = '*';
            updatedCards[index] = '*';
            return updatedCards;
          });
          setCardPair([]);
        }, 1000);
      }

      setTryCount((prevCount) => prevCount + 1);
    }
  };


  useEffect(() => {
    // Start the timer when the game is not over
    if (!gameOver) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameOver]);

  const renderBoard = () => {
    // Render the game board
    const boardSizeClass = `board board-${boardSize}x${boardSize} mx-auto my-4`;
    const rows = [];

    for (let i = 0; i < boardSize; i++) {
      const cols = [];

      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;
        const card = (
          <div
            className={`card ${displayedCards[index] !== '*' ? 'flipped' : ''}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            {displayedCards[index]}
          </div>
        );

        cols.push(
          <div className="col" key={index}>
            {card}
          </div>
        );
      }

      rows.push(
        <div className="row" key={i}>
          {cols}
        </div>
      );
    }

    return <div className={boardSizeClass}>{rows}</div>;
  };


  const putGameOver = () => {
    // Put the game over screen
    return (
      <div className="game-over">
        <h2>Game Over!</h2>
        <p>Completed in {timer} seconds</p>
        <p>Total tries: {tryCount}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="App">
        {!gameOver ? (
          <div>
            <h1>Memory Card Game</h1>
            <h3>Tries: {tryCount}</h3>
            <h3>Timer: {timer} seconds</h3>
            {renderBoard()}
          </div>
        ) : (
          putGameOver()
        )}
        <div className="options">
          <button onClick={() => setBoardSize(2)}>2x2</button>
          <button onClick={() => setBoardSize(4)}>4x4</button>
          <button onClick={() => setBoardSize(6)}>6x6</button>
          <button onClick={() => setBoardSize(8)}>8x8</button>
        </div>
        <button onClick={initializeGame}>Start Game</button>
      </div>
    </div>
  );
}


export default MemoryCardGame;
