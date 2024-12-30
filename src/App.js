import Header from './components/Header';
import Language from './components/language';
import Keyboard from './components/Keyboard';
import uniqid from "uniqid"
import { useState } from 'react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti';


function App() {
  const [languages, setLanguages] = useState([
    {value:"HTML",isDead:false, color:"#8CB369"},
    {value:"CSS",isDead:false, color:"#F14A00"},
    {value:"JavaScript",isDead:false, color:"#DA498D"},
    {value:"React",isDead:false, color:"#5B8E7D"}, 
    {value:"Typescript",isDead:false, color:"#BC4B51"},
    {value:"Node.js",isDead:false, color:"#2B2D42"},
    {value:"Python",isDead:false, color:"#500073"},
    {value:"Ruby",isDead:false, color:"#CC4BC2"},
    {value:"Assembly",isDead:false, color:"#E16F7C"},
  ]);

  const [keyboardKey, setKeyboardKey] = useState(()=>alphabetGenerator())

  function alphabetGenerator(){
    return new Array(26).fill(65).map((num,index)=>{ 
       return {
        value:String.fromCharCode(num+index),
        id:uniqid(),
        isTapWrong:false,
        isTapRight:false
       }
    })
  }
  const [word, setWord] = useState(()=>randomWord().split("").map((char,index)=>{
    return {letter:char,position:index, isFound:false}
  }))

  const [counter, setCounter] = useState(8)

  function randomWord(){
    let arr=["cat", "sun", "dog", "pencil", "hat","eagle"]
    return arr[Math.floor(Math.random()*arr.length)]
  }

  function handleClick(value,id){

    let milgaya=false
    word.map(obj=>{
      if(obj.letter===value.toLowerCase())
      {
        console.log("hi")
        milgaya=true

        document.getElementById(`${id}`).style.backgroundColor="#2dc653"
        setWord(prev=>{
          return prev.map(obj=>{
            if(obj.letter===value.toLowerCase()){
              return {...obj, isFound:true}
            }
            return obj
          })
        })
        // make button green
        setKeyboardKey(prev=>{
          return prev.map(obj=>{
            if(value===obj.value){
              return {...obj,isTapRight:true}
            }
            return obj
          })
        })
      }
    })
    if(milgaya){
      return ""
    }
    else{
      setCounter(prev=>{
        return keyboardKey[value.charCodeAt(0)-65].isTapWrong ? prev:prev-1
      })
      // console.log("wrong")
      document.getElementById(`${id}`).style.backgroundColor="#e5383b"
      // make button wrong
      
      let cba=keyboardKey[value.charCodeAt(0)-65].isTapWrong ? "":languages[8-counter].isDead=true
      setKeyboardKey(prev=>{
        return prev.map(obj=>{
          if(value===obj.value){
            return {...obj,isTapWrong:true}
          }
          return obj
        })
      })
    }
  }

  let gameWon=false
  let gameOver=false
  if(word.every(obj=>obj.isFound)){
    gameWon=true
    gameOver=true
  }
  if(counter === 0){
    gameOver=true
  }
  

  function Restart(){
    setWord(randomWord().split("").map((char,index)=>{
      return {letter:char,position:index, isFound:false}
    }))
    setKeyboardKey(alphabetGenerator())
    setLanguages(prev=>prev.map(obj=>{
      return {...obj, isDead:false}
    }))
    setCounter(8)
  }

  // console.log(word)
  // console.log(keyboardKey)
  const keyboardKeyelement= keyboardKey.map(key=>{
      return <div key={key.id} id={key.id} className="keyboard-key" onClick={()=>gameWon || gameOver ? "":handleClick(key.value,key.id)}>{key.value}</div>
  })
  const { width, height } = useWindowSize()
  return (
    <>{gameWon && <Confetti width={width} height={height}/>}
    <Header result={gameWon} end={gameOver} counter={counter}/>
    <Language languages={languages}/>
    <div className='guess-section'>
      {word.map((obj,id)=>{
        return <span key={id} className='guess-char-box'>{obj.isFound ? obj.letter.toLocaleUpperCase():""}</span>
      })}
    </div>
    <Keyboard keyboardKeyelement={keyboardKeyelement} />
    { (gameWon || gameOver) && <div className='newGame' onClick={Restart}>New Game</div>}
    </>
  );
}

export default App;
