import React from 'react'; // Import React
import Flashcard from './Flashcard'; // Import the Flashcard component

/**
 * FlashcardList Component
 * @param {Object} props - Component props
 * @param {Array} props.flashcards - Array of flashcard objects
 * @param {boolean} props.isFlipped - Indicates if the current card is flipped
 * @param {Function} props.setIsFlipped - Function to update the flipped state
 * @param {number} props.cardNumber - The current card number
 * @param {Function} props.goNext - Function to navigate to the next card
 * @param {Function} props.goBack - Function to navigate to the previous card
 */
function FlashcardList({ flashcards, isFlipped, setIsFlipped, cardNumber, goNext, goBack }) {
  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard, index) => (
        <Flashcard
          key={index} // Unique key for each flashcard
          flashcard={flashcard} // Pass the flashcard data
          isFlipped={isFlipped} // Pass the flipped state
          setIsFlipped={setIsFlipped} // Pass the function to set the flipped state
          cardNumber={cardNumber} // Pass the current card number
          goNext={goNext} // Pass the goNext function for navigation
          goBack={goBack} // Pass the goBack function for navigation
        />
      ))}
    </div>
  );
}

export default FlashcardList; // Export the FlashcardList component