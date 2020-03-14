import React, { useState  } from 'react';
import { Input, List } from 'antd';
import { Palette } from 'react-palette';
import { motion } from 'framer-motion';
import moment from 'moment';
import './App.css';

function App() {
  const championData = require('./data/championData.json').data
  const [championToGuess, setChampionToGuess] = useState('')
  const [gameStart, setGameStart] = useState(false)
  const [championNames] = useState(Object.keys(championData))
  const [championsGuessed] = useState([])
  const [seconds, setSeconds] = useState(0)

  // Body of the page
  var start =
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
    championNames.splice(randomNumber, 1)  }

  // Function to check if user input matches champion to guess
  //   if it does, generate new champion and remove guessed from list
  const checkInput = (e) => {
    if ((e.target.value).toLowerCase() === championToGuess.toLowerCase()) {
      e.target.value = ""
      generateRandomChampion()
      championsGuessed.push(championToGuess)
    }
  }

  // Game once it starts
  if (gameStart === true) {
    var timer = setTimeout(() => {
      setSeconds(seconds + 1)
    }, 1000)
    start = 
      <div></div>
    var guess = 
      <div>
        <p> Time: {moment(seconds*1000).format('mm:ss')}</p>
        <p> You have guessed {championsGuessed.length} out of the {championNames.length + championsGuessed.length} champions </p>
        <p> {championToGuess} {championData[championToGuess].title} </p>
        <Input 
          style={{ width:128, marginBottom:8 }} 
          placeholder="Champion Name"
          onPressEnter={e => checkInput(e)}
        />
      </div>
    var body = 
      <div>
        <br/>
        {championsGuessed}
        <List
          grid={{
            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
          }}
          dataSource={championsGuessed}
          renderItem={item => (
            <List.Item>
              <Palette src={require(`./data/champion/${item}.png`)}>
                {({ data }) => (
                  <div style={{ color: data.vibrant }}>
                    {item}
                    <br/><br/>
                    <motion.img
                      alt={item}
                      animate={{ scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        height: 60,
                        width: 60,
                        border: '6px',
                        borderStyle: 'solid',
                        borderRadius: 200,
                        borderWidth: 5,
                      }}
                      src={ require(`./data/champion/${item}.png`) } 
                    />
                  </div>
                )}
              </Palette>
            </List.Item>
          )}
        />
      </div>
  }

  // Make body of page the game once start is clicked
  if (championNames.length === 0) {
    clearInterval(timer)
    guess =
      <div>
        <p> Time: {moment(seconds*1000).format('mm:ss')}</p>
        <p>you win</p>
      </div>
    start = 
      <div></div>
  }

  // HTML Part
  return (
    <div className="App">
      <h1> League of Legends Champion Guesser </h1>
      {guess}
      {start}
      {body}
    </div>
  );
}

export default App;
