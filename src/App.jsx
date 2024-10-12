import React, { useState } from 'react'; // Import React and useState hook
import './App.css'; // Import the CSS file
import FlashcardList from './components/FlashcardList'; // Import the FlashcardList component

/**
 * App Component
 * The main component that manages the state and renders different screens based on the quiz's progress.
 */
function App() {
  // State to hold flashcards
  const [flashcards, setFlashcards] = useState([
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
    { question: 'What is the chemical symbol for gold?', answer: 'Au' },
    { question: 'What is the highest mountain in the solar system?', answer: 'Olympus Mons' },
    { question: 'What is the smallest country in the world?', answer: 'Vatican City' },
    { question: 'Who is the main character in the book "To Kill a Mockingbird" ?', answer: 'Scout Finch' },
    { question: 'What is the largest living species of lizard?', answer: 'Komodo dragon' },
    { question: 'What is the deepest part of the ocean?', answer: 'Challenger Deep' },
    { question: 'What is the highest recorded temperature on Earth?', answer: '134°F' },
    { question: 'What is the speed of light?', answer: '299,792,458 meters per second' }, // Added new question
    { question: 'What is the powerhouse of the cell?', answer: 'Mitochondria' }, // Added another new question
  ]);

  // State to track the current flashcard index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track if the card is flipped
  const [isFlipped, setIsFlipped] = useState(false);

  // State to track if the quiz has started
  const [isStarted, setIsStarted] = useState(false);

  // State to track if the quiz is finished
  const [isFinished, setIsFinished] = useState(false);

  /**
   * Navigates to the next flashcard.
   * If at the end of the list, it marks the quiz as finished.
   */
  const goNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next flashcard
      setIsFlipped(false); // Reset the flipped state
    } else {
      setIsFinished(true); // Mark the quiz as finished
    }
  };

  /**
   * Navigates to the previous flashcard.
   * If at the beginning of the list, it loops to the last flashcard.
   */
  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous flashcard
    } else {
      setCurrentIndex(flashcards.length - 1); // Loop to the last flashcard
    }
    setIsFlipped(false); // Reset the flipped state
  };

  /**
   * Starts the quiz by updating the state.
   */
  const startQuiz = () => {
    setIsStarted(true); // Mark the quiz as started
    setIsFlipped(false); // Ensure the quiz starts with the question side
    setIsFinished(false); // Reset the finished state
  };

  /**
   * Restarts the quiz by resetting all relevant states.
   */
  const restartQuiz = () => {
    setIsStarted(false); // Reset the started state
    setIsFinished(false); // Reset the finished state
    setCurrentIndex(0); // Reset to the first flashcard
    setIsFlipped(false); // Reset the flipped state
  };

  return (
    <div className="App">
      {/* Start Screen */}
      {!isStarted ? (
        <div className="start-screen">
          <h1>Flashcards App</h1>
          <p>Learn something new with our flashcards!</p>
          <p>Total Cards: {flashcards.length}</p>
          <button onClick={startQuiz}>Start</button> {/* Start Quiz Button */}
        </div>
      ) : isFinished ? (
        /* Finish Screen */
        <div className="finish-screen">
          <h1>Quiz Finished!</h1>
          <p>You've gone through all the flashcards.</p>
          <button onClick={restartQuiz}>Restart</button> {/* Restart Quiz Button */}
        </div>
      ) : (
        /* Quiz Screen */
        <div className="quiz-screen">
          <FlashcardList
            flashcards={[flashcards[currentIndex]]} // Pass the current flashcard as an array
            isFlipped={isFlipped} // Pass the flipped state
            setIsFlipped={setIsFlipped} // Pass the function to set the flipped state
            cardNumber={currentIndex + 1} // Pass the current card number (1-based index)
            goNext={goNext} // Pass the goNext function for navigation
            goBack={goBack} // Pass the goBack function for navigation
          />
          {/* Removed the external button-group to handle navigation within Flashcard.jsx */}
        </div>
      )}
    </div>
  );
}

export default App; // Export the App component