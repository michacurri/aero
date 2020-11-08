import React, { useState, useEffect, Fragment } from 'react'


function NumCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('rendered');

}, [])

// const element = <p>{count}</p>;
// ReactDOM.render(element, document.getElementById('counterBox'));

  return(
      <Fragment>
        <p id="counterBox">{count}</p>
      </Fragment>
  )
}

export default NumCounter