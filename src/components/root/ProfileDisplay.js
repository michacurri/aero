import React, { Fragment } from "react";

const ProfileDisplay = ({ currentProfile }) => {
  const { firstName, lastName, phone, email } = currentProfile;
  return (
    <Fragment>
      <div className="profile__contact">
        <ul>
          <li>{firstName}</li>
          <li>{lastName}</li>
          <li>{phone}</li>
          <li>{email}</li>
        </ul>
      </div>
      <div className="profile__latestWorkorder">
        // for loop display last 3 workorders
      </div>
    </Fragment>
  );
};

export default ProfileDisplay;
