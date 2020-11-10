import React, { Fragment, useEffect, useState } from "react";
import NumCounter from "../admin/NumCounter";

function Form() {
  return (
    <Fragment>
      <div className="form__wrapper wrapper">
        <div id="numCounter">
          <NumCounter />
          <button onClick={() => setCount(count + 1)}></button>
        </div>
      </div>
    </Fragment>
  );
}

export default Form;
