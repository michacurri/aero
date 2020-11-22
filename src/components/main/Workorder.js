import React, { Fragment } from "react";

// TODO
//

const Workorder = (props) => {
  const { updateWorkorderId } = props;
  const handleSubmit = () => {
    console.log("handled submit");
    updateWorkorderId();
  };

  return (
    <Fragment>
      <h4>New Workorder</h4>
      <form onSubmit={() => handleSubmit()}>
        <label htmlFor="workorderId">{props.workorderId}</label>
        <br />
        <input
          type="text"
          // value={brand}
          // onChange={(event) => props.onChange(event.target.value)}
          name="workorderId"
          id="workorderId"
        />
        <br />
      </form>
      <button onClick={() => handleSubmit()} />
    </Fragment>
  );
};

// const handleSubmit = (event) => {
//   event.preventDefault();
// };

// }

export default Workorder;
