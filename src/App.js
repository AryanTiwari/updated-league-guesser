import React, { useState  } from 'react';
import { Input, List } from 'antd';
import { Palette } from 'react-palette';
import { motion } from "framer-motion"
import './App.css';

function App() {
  const championData = require('./data/championData.json').data

  const [guessedChamp , setGuessedChamp] = useState('')
  const [championToGuess, setChampionToGuess] = useState('')
  const [gameStart, setGameStart] = useState(false)
  const [championNames] = useState(Object.keys(championData))
  const [championsGuessed] = useState([])

  // Body of the page
  var body =
    <div>
      <button
        style={{ 
          borderRadius: 5,
          height: 40,
          width: 90
        }} 
        onClick={() => startGame()}> 
      Start Game 
      </button>
    </div>

  // Set gameStart to true and show champion to guess and input box
  const startGame = () => {
    generateRandomChampion()
    setGameStart(true)
  }

  // Generate a random champion to guess
  const generateRandomChampion = () => {
    var randomNumber = Math.round(Math.random() * (championNames.length - 1))
    setChampionToGuess(championNames[randomNumber])
    championNames.splice(randomNumber, 1)
  }

  // Function to check if user input matches champion to guess
  //   if it does, generate new champion and remove guessed from list
  const checkInput = (championGuess) => {
    setGuessedChamp(championGuess)
    if (true) {
      generateRandomChampion()
      championsGuessed.push(championToGuess)
    }
  }

  // Make body of page the game once start is clicked
  if (championNames.length === 0) {
    body =
    <div>
      <p> you win </p>
    </div>
  }
  else if (gameStart === true) {
    body = 
    <div>
    <p> You have guessed {championsGuessed.length} out of the {championNames.length + championsGuessed.length} champions </p>
    <p> {championToGuess} {championData[championToGuess].title} </p>
      <Input style={{ width:128, marginBottom:8 }} 
      placeholder="Champion Name"
      onPressEnter={() => checkInput()}/>
      <br/>
      {championsGuessed}
      <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
        }}
        dataSource={championsGuessed.slice().reverse()}
        renderItem={item => (
          <List.Item>
            <Palette src={require(`./data/champion/${item}.png`)}>
              {({ data }) => (
                <div style={{ color: data.vibrant }}>
                  {item}
                  <div/>
                  <div className='championIcons' style={{borderColor: data.vibrant}}>
                    <img
                      alt={item}
                      style={{height:81,width:81}}  
                      src={ require(`./data/champion/${item}.png`) } 
                    />
                  </div>
                </div>
              )}
            </Palette>
          </List.Item>
        )}
      />
    </div>
  }

  // HTML Part
  return (
    <div className="App">
      <h1> League of Legends Champion Guesser </h1>
      {body}
    </div>
  );
}

export default App;
