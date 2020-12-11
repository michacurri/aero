import React, { useState } from "react";
import ContactEditor from "./ContactEditor";

function ProfileCreate(props) {
  const [contact, setContact] = useState();

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
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      props.getProfile();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={addRecord}>
        <ContactEditor contact={contact} onChange={updateContactField} />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default ProfileCreate;
