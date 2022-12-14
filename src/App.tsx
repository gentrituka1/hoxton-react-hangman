import { useEffect, useState } from "react";
import "./App.css";

const letters = "abcdefghijklmnopqrstuvwxyz";

const words = [
  "nicolas",
  "edmond",
  "gentrit",
  "elona",
  "brunilda",
  "elsi",
  "enesi",
  "kabil",
  "xhulia",
  "uran",
  "aid",
  "edona",
  "arbenit",
  "bedra",
  "aris",
  "eva",
  "flori",
  "darvin",
  "igli",
  "leonard",
  "redi",
  "taulant",
  "teodora",
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState(['']);

  let wrongGuesses = guesses.filter((guess) => !word.includes(guess));
  let correctGuesses = guesses.filter((guess) => word.includes(guess));

  const lives = 6 - wrongGuesses.length;
  const wordsLeft = (word.length + 1) - correctGuesses.length;

  let lost = lives === 0
  let won = word.split('').every(char => correctGuesses.includes(char))

  function playAgain() {
    setGuesses([]);
    setWord(getRandomWord());
  }

  useEffect(() => {
    if (lost || won) return;

    function listener (event) {
      let guess = event.key.toLowerCase();

      if (!letters.includes(guess)) return;
      if (guesses.includes(guess)) return;

      setGuesses([...guesses, guess]);
    };

    window.addEventListener("keydown", listener);

    return () => removeEventListener("keydown", listener);
  }, [guesses, lost, won]);

  return (
    <div className="App">
      <div className="word">
        {word.split("").map((char, index) => (
          <span key={index}>{correctGuesses.includes(char) ? char : "_"} </span>
        ))}
      </div>
      <p className="words-left">Words left: {wordsLeft}</p>
      <p className="wrongGuesses">Wrong guesses({lives}): {wrongGuesses}</p>
      {lost ? (
        <div className="the-div">
          <p>Sorry, you lost🤕 </p>
          <p>Word was: {word}</p>
          <button className="button" onClick={playAgain}>Play Again</button>
        </div>
      ) : null}
      {won ? (
        <div className="the-div">
          <p>You win</p>
          <button className="button" onClick={playAgain}>Play Again</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
