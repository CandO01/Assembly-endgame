import React, { useState, useEffect } from 'react'
import './App.css'
import { languages } from './languages'
import clsx from 'clsx'
import getRandomWords from './utils.js'
import Confetti from 'react-confetti'


function App() {

  const [currentWord, setCurrentWord] = useState(getRandomWords())
  const [userGuess, setUserGuess] = useState([])
  const [clicked, setClicked] = useState({})
  const [message, setMessage] = useState('')
  const [text, setText] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [maxGuessCount, setMaxGuessCount] = useState(8)

  //on component mount
  useEffect(()=>{
    if(!currentWord){
      setCurrentWord(getRandomWords())
    }
  }, [])

    //for wrong guesses
      useEffect(() => {
        if(!currentWord) return

        const allLettersGuessed = currentWord
          .split('')
          .every((char) => userGuess.includes(char));

        if (maxGuessCount <=0) {
          setMessage('Game Over');
          setText('You had better start learning Assembly 😭');
          setGameStatus('lose')
        } else if (allLettersGuessed) {
          setMessage('You won!');
          setText('Well done 🎉');
          setGameStatus('win')
        } else {
          setMessage('');
          setText('');
        }
      }, [userGuess, currentWord, maxGuessCount]);


//function to handleclicks
 function handleClick(letter){
  setUserGuess((prevLetter)=>{
    return prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
  })

  //set status color of the button
  setClicked((prev)=>{
    return ({
      ...prev,
      [letter]: currentWord.includes(letter) ? 'correct' : 'wrong'
    })
  })

  //tohandle number of clicks
  if(!currentWord.includes(letter)){
    setMaxGuessCount(prevCount=> prevCount - 1)
  }
 }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

   const wrongGuessCount = userGuess.filter(
          (letter) => !currentWord.includes(letter)
        ).length;

  const language = languages.map((lang, index)=>{
    //to determine if the language is lost using index
    const isLanguageLost = index < wrongGuessCount

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return <span
            key={lang.name}
            style={styles}
            className={`chip ${isLanguageLost ? 'lost' : ''}`}
            >{lang.name}</span>
  })

  //for current word
  const output = currentWord.split('')
  const result = output.map((letter, index)=>{
    const isGuessed = userGuess.includes(letter)
    const isMissed = !isGuessed && gameStatus === 'lose'
    return <span 
              key={index}
              style={{
                    backgroundColor: isMissed ? 'red' : isGuessed ?  '#f5f5f533' : '',
                    padding: '10px',
                    color: 'white',
                     fontSize: '1.125rem',
                     borderBottom: '1px solid #F9F4DA'
              }}
            >
              {(isGuessed || gameStatus==='lose') ? letter.toUpperCase() : ''}
            </span>
  })

  //gamewon
  const isGameWon = currentWord
          .split('')
          .every(letter => userGuess.includes(letter))

  //to check if the game is over
  const isGameOver = gameStatus === 'win' || gameStatus === 'lose'

  // for button
  const outputAlpha = alphabet.split('').map((letter, idx)=>{
      return <button 
              key={idx}
              onClick={()=>handleClick(letter)}
              className={clsx(
                'button',
                {
                  correct: clicked[letter] === 'correct',
                  wrong: clicked[letter] === 'wrong'
                }
              )}
              disabled={isGameOver}
              aria-disabled={userGuess.includes(letter)}
             >
              {letter.toUpperCase()}
             </button>
  })

  function resetGame(){
    setCurrentWord(getRandomWords())
    setGameStatus('')
    setClicked({})
    setText('')
    setMessage('')
    setUserGuess([])
    setMaxGuessCount(8)

  }




  return (
    <main>
      {
        isGameWon && <Confetti 
                        recycle={false}
                        numberOfPieces={1000}
                      />
      }
      <header>
        <h1>Assembly: Endgame</h1>
         <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
      </header>

       <h2 className='maxcount'>Number of count left: {maxGuessCount}</h2>

      <section className={clsx('game-status',{
        'win-background': gameStatus === 'win',
        'lose-background': gameStatus === 'lose'
      })}>
          {isGameOver &&
            <>
              <h2>{message}</h2>
              <p>{text}</p>
            </>
          }
      </section>

      <section className='language-chips'>
        {language}
      </section>

      <section className='words'>
        {result}
      </section>

      <section className='alpha-btn'>
        {outputAlpha}
      </section>
      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
    </main>
  )
}

export default App