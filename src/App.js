import React, { useState, useEffect } from "react";
import "./App.css";

//Memory card game full functionality code 

function MemoryCardGame() {
  const [cards, setCards] = useState([]);
  const [positions, setPositions] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [cardPair, setCardPair] = useState([]);
  const [tryCount, setTryCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [boardSize, setBoardSize] = useState(2); // Initial board size: 2x2

  const number_of_cards = boardSize * boardSize;

  // Initialize the game
  const initializeGame = () => {
    const numbers_list = makeRandomNumberList(number_of_cards);
    const positions = shufflePositions(generatePositions());

    setCards(numbers_list);
    setPositions(positions);
    setDisplayedCards(new Array(number_of_cards).fill("*"));
    setCardPair([]);
    setTryCount(0);
    setMatchCount(0);
    setGameOver(false);
    setTimer(0);
  };

  // Generate random number list for cards
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

  // Shuffle card positions
  const shufflePositions = (positions) => {
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    return positions;
  };

  // Handle card click
const handleCardClick = (index) => {
  if (displayedCards[index] !== "*") {
    return;
  }

  if (cardPair.length === 0) {
    setCardPair([index]);
    setDisplayedCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = cards[index].toString();
      return updatedCards;
    });
  } else if (cardPair.length === 1) {
    setCardPair((prevPair) => [...prevPair, index]);
    setDisplayedCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = cards[index].toString();
      return updatedCards;
    });

    // Compare the numbers on the two selected cards
    if (cards[cardPair[0]] === cards[index]) {
      setMatchCount((prevCount) => prevCount + 1);
      if (matchCount + 1 === number_of_cards / 2) {
        setGameOver(true);
      }
      setCardPair([]);
    } else {
      setTimeout(() => {
        setDisplayedCards((prevCards) => {
          const updatedCards = [...prevCards];
          updatedCards[cardPair[0]] = "*";
          updatedCards[index] = "*";
          return updatedCards;
        });
        setCardPair([]);
      }, 1000);
    }

    // Increase the try count
    setTryCount((prevCount) => prevCount + 1);
  }
};



  // Timer logic
  useEffect(() => {
    if (!gameOver) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameOver]);

  // Make the game board
  const renderBoard = () => {
    const boardSizeClass = `board board-${boardSize}x${boardSize}`;

    return (
      <div className={boardSizeClass}>
        {positions.map((position, index) => (
          <div
            className={`card ${displayedCards[index] !== "*" ? "flipped" : ""}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            {displayedCards[index]}
          </div>
        ))}
      </div>
    );
  };

  // Send the game over message
  const renderGameOver = () => {
    return (
      <div className="game-over">
        <h2>Game Over!</h2>
        <p>Completed in {timer} seconds</p>
        <p>Total tries: {tryCount}</p>
      </div>
    );
  };

  return (
    <div className="App">
      {!gameOver ? (
        <div>
          <h1>Memory Card Game</h1>
          <h3>Tries: {tryCount}</h3>
          <h3>Timer: {timer} seconds</h3>
          {renderBoard()}
        </div>
      ) : (
        renderGameOver()
      )}
      <div className="options">
        <button onClick={() => setBoardSize(2)}>2x2</button>
        <button onClick={() => setBoardSize(4)}>4x4</button>
        <button onClick={() => setBoardSize(6)}>6x6</button>
        <button onClick={() => setBoardSize(8)}>8x8</button>
      </div>
      <button onClick={initializeGame}>Start Game</button>
    </div>
  );
}

export default MemoryCardGame;






