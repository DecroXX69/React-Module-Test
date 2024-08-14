import React from 'react'

export default function AppComponent() {

  let count = 0


  function handleAdd(){
    console.log("adfar")
    count++

  }
  return (
    <div >
      
      <h1>Count: {count}</h1>
      <button onClick={handleAdd}>Add One</button>
    </div>
  )
}
