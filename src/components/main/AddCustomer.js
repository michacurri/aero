import React, { useState } from "react";
import ContactEditor from "./ContactEditor";

function AddContact(props) {
  const [contact, setContact] = useState({});

  const updateContactField = (e) => {
    const contactState = { ...contact };
    contactState[e.target.name] = e.target.value;
    setContact(contactState);
  };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contacts", {
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

  return (
    <div>
      <form onSubmit={addRecord}>
        <ContactEditor onChange={updateContactField} contact={contact} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default AddContact;
