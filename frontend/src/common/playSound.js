import clickSound from '../assest/sucess.mp3'; // Adjust the path as necessary

/**
 * Plays the success sound.
 */
const playSound = () => {
  // Create a new Audio object using the imported sound file
  const audio = new Audio(clickSound);
  
  // Play the sound and handle any potential errors
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
};

export default playSound;
