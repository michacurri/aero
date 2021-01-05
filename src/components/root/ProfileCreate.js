import React, { useState } from "react";
import ContactEditor from "./ContactEditor";
import { useHistory } from "react-router-dom";

const headers = { "Content-Type": "application/json" };

function ProfileCreate({ changeLink }) {
  const [contact, setContact] = useState();
  const history = useHistory();

  const updateContactField = (e) => {
    const contactState = { ...contact };
    contactState[e.target.name] = e.target.value;
    setContact(contactState);
  };

  const redirectOnSubmit = () => {
    history.push("/login");
    changeLink();
  };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      redirectOnSubmit();
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
