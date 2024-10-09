import React, { useState } from 'react'; // Import React and useState hook

/**
 * Flashcard Component
 * @param {Object} props - Component props
 * @param {Object} props.flashcard - The flashcard data containing question and answer
 * @param {boolean} props.isFlipped - Indicates if the card is flipped to show the answer
 * @param {Function} props.setIsFlipped - Function to update the flipped state
 * @param {number} props.cardNumber - The current card number
 * @param {Function} props.goNext - Function to navigate to the next card
 * @param {Function} props.goBack - Function to navigate to the previous card
 */
function Flashcard({ flashcard, isFlipped, setIsFlipped, cardNumber, goNext, goBack }) {
  // State to hold the user's input answer
  const [userAnswer, setUserAnswer] = useState('');
  // State to hold feedback message after submission
  const [answerFeedback, setAnswerFeedback] = useState('');

  /**
   * Handles the flipping of the flashcard.
   * Flips the card only if it's not already flipped.
   */
  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true); // Flip to show the answer
  };

  /**
   * Prevents event propagation to parent elements.
   * @param {Object} e - The event object
   */
  const handleUserInteraction = (e) => {
    e.stopPropagation(); // Prevents the card from flipping when interacting with input/button
  };

  /**
   * Handles the submission of the user's answer.
   * Compares the user's answer with the correct answer in a case-insensitive manner.
   * Provides feedback based on the comparison result.
   * @param {Object} e - The event object
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    handleUserInteraction(e); // Stops event propagation

    // Trim and convert both answers to lowercase for case-insensitive comparison
    const trimmedUserAnswer = userAnswer.trim().toLowerCase();
    const correctAnswer = flashcard.answer.trim().toLowerCase();

    // Check if the user's answer matches the correct answer
    if (trimmedUserAnswer === correctAnswer) {
      setAnswerFeedback('Correct!'); // Set feedback for correct answer
    } else {
      setAnswerFeedback(`Incorrect! The correct answer is "${flashcard.answer}".`); // Set feedback for incorrect answer
    }

    setIsFlipped(true); // Flip the card to show the answer and feedback
  };

  /**
   * Handles navigating to the next flashcard.
   * Resets the user input and feedback, flips back to show the question.
   */
  const handleNext = () => {
    setUserAnswer(''); // Clear the user's answer input
    setAnswerFeedback(''); // Clear the feedback message
    setIsFlipped(false); // Reset the flipped state to show the question
    goNext(); // Navigate to the next flashcard
  };

  /**
   * Handles navigating back to the previous flashcard.
   * Resets the user input and feedback, flips back to show the question.
   */
  const handleBack = () => {
    setUserAnswer(''); // Clear the user's answer input
    setAnswerFeedback(''); // Clear the feedback message
    setIsFlipped(false); // Reset the flipped state to show the question
    goBack(); // Navigate to the previous flashcard
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-content">
        <p>Card {cardNumber}</p>
        {isFlipped ? (
          <>
            <p>{flashcard.answer}</p> {/* Display the correct answer */}
            <p>{answerFeedback}</p> {/* Display feedback message */}
            <div className="button-group">
              <button onClick={handleBack}>Back</button> {/* Back button */}
              <button onClick={handleNext}>Next</button> {/* Next button */}
            </div>
          </>
        ) : (
          <>
            <p>{flashcard.question}</p> {/* Display the question */}
            <form onSubmit={handleSubmit} onClick={handleUserInteraction}> {/* Form to handle Enter key submission */}
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)} // Update userAnswer state on input change
                placeholder="Enter your answer"
              />
              <button type="submit">Submit</button> {/* Submit button */}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Flashcard; // Export the Flashcard component