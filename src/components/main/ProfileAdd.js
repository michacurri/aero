import React, { useState } from "react";
import ContactEditor from "./ContactEditor";

function ProfileAdd(props) {
  const [contact, setContact] = useState({});
  
  const updateContactField = (e) => {
    const contactState = { ...contact };
    contactState[e.target.name] = e.target.value;
    setContact(contactState);
  };
  
  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
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
  // const {firstName, lastName, phone, email} = contact;
  
  return (
    <div>
      <form onSubmit={addRecord}>
        <ContactEditor contact={contact} onChange={updateContactField} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default ProfileAdd;
