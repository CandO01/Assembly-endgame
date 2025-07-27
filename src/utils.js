import  randomWords  from "./words.js";

export default function getRandomWords(){
  const randomIndex = Math.floor(Math.random() * randomWords.length)
  return randomWords[randomIndex]
}