import React, { useState, useEffect } from 'react'
import './App.css'
import { languages } from './languages'
import clsx from 'clsx'

function App() {

  const [currentWord, setCurrentWord] = useState('react')
  const [userGuess, setUserGuess] = useState([])
  const [clicked, setClicked] = useState({})
  const [message, setMessage] = useState('')
  const [text, setText] = useState('')
  const [gameStatus, setGameStatus] = useState('')

   console.log(userGuess)

   const maxGuessCount = 8

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
 }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const language = languages.map((lang)=>{
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return <span
            key={lang.name}
            style={styles}
            className='chip'
            >{lang.name}</span>
  })

  //for current word
  const output = currentWord.split('')
  const result = output.map((letter, index)=>{
    return <span 
              key={index}
              style={{
                    backgroundColor: '#f5f5f533',
                    padding: '10px',
                    color: 'white',
                     fontSize: '1.125rem',
                     borderBottom: '1px solid #F9F4DA'
              }}
            >
              {userGuess.includes(letter) ? letter.toUpperCase() : ''}
            </span>
  })

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
             >
              {letter.toUpperCase()}
             </button>
  })

  //for wrong guesses
useEffect(() => {
  const wrongGuessCount = userGuess.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const allLettersGuessed = currentWord
    .split('')
    .every((char) => userGuess.includes(char));

  if (wrongGuessCount >= maxGuessCount) {
    setMessage('Game Over');
    setText('You had better start learning Assembly');
    setGameStatus('lose')
  } else if (allLettersGuessed) {
    setMessage('You won!');
    setText('Well done 🎉');
    setGameStatus('win')
  } else {
    setMessage('');
    setText('');
  }
}, [userGuess, currentWord]);


  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
         <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
      </header>

      <section className={clsx('game-status',{
        'win-background': gameStatus === 'win',
        'lose-background': gameStatus === 'lose'
      })}>
          <h2>{message}</h2>
          <p>{text}</p>
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
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App