import React, { Fragment, useEffect, useState } from "react";
import NumCounter from "./NumCounter";

function Form() {
  return (
    <Fragment>
      <div id="formContainer">
        <div id="numCounter">
          <NumCounter />
          <button onClick={() => setCount(count + 1)}></button>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;
