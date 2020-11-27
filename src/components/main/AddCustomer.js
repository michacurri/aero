import React, { useState } from "react";
import ContactEditor from "./ContactEditor";

function AddCustomer(props) {
  const [contact, setContact] = useState({});
  console.log(contact);
  
  const updateContactField = (e) => {
    const contactState = { ...contact };
    contactState[e.target.name] = e.target.value;
    setContact(contactState);
  };
  
  const addRecord = async (e) => {
    console.log(props);
    e.preventDefault();
    try {
      // ! ADDD SOMETHING TO THE FETCH
      const response = await fetch("/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email }),
      });
      if (response.ok) {
        props.onAdd();
      } else {
        console.log("Error when saving record");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const {firstName, lastName, phone, email} = contact;
  
  return (
    <div>
      <form onSubmit={addRecord}>
        <ContactEditor onChange={updateContactField} contact={contact} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default AddCustomer;
