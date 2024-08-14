import React, { useState }  from 'react'

export default function Counter() {
const[state,setCount] = useState(0)
const[backgroundColor, setBackgroundColor] = useState('pink')
 function incrementCount() {
    setCount(state + 1)
  }
  let myStyles ={
    color : 'red',
    backgroundColor: backgroundColor,
    fontSize: '30px'
  }

  return (

    <div style={myStyles}>
    <button onClick={()=>setBackgroundColor('black')}>black</button>
    <button onClick={()=>setBackgroundColor('green')}>green</button>
    <button onClick={()=>setBackgroundColor('blue')}>blue</button>
    <button onClick={()=>setBackgroundColor('red')}>red</button>
    <button onClick={()=>setBackgroundColor('pink')}>pink</button>
   <h1>Counter: {state}</h1> 
    <button onClick={incrementCount}>Increment Counter</button>
    </div>
  )
}
