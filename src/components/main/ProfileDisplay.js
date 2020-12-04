import React from "react";

const ProfileDisplay = ({ memberId, firstName, lastName, phone, email }) => {
  return (
    <ul>
      <li>{memberId}</li>
      <li>{firstName}</li>
      <li>{lastName}</li>
      <li>{phone}</li>
      <li>{email}</li>
    </ul>
  );
};

export default ProfileDisplay;
