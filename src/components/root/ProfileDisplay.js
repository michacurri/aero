import React from "react";

const ProfileDisplay = ({currentProfile}) => {
  const {firstName, lastName, phone, email} = currentProfile;
  return (
    <ul>
      <li>{firstName}</li>
      <li>{lastName}</li>
      <li>{phone}</li>
      <li>{email}</li>
    </ul>
  );
};

export default ProfileDisplay;
