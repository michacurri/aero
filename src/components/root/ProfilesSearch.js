import React, { useState, Fragment } from "react";
import ContactEditor from "../root/ContactEditor";

const ProfileSearch = (props) => {
  const [searchBy, setSearchBy] = useState(null);
  const [value, setValue] = useState({});

  const updateSearchField = (e) => {
    const searchQuery = { ...value };
    searchQuery[e.target.name] = e.target.value;
    console.log(searchQuery);
    setValue(searchQuery);
  };

  const searchProfiles = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/profile/search/${searchBy}/${value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

  const searchByMemberId = () => setSearchBy("memberId");
  const SearchByPhone = () => setSearchBy("phone");
  const searchByEmail = () => setSearchBy("email");

  return (
    <Fragment>
      <h3>Search By:</h3>
      <button onClick={searchByMemberId}>Member ID</button>
      <button onClick={SearchByPhone}>Phone Number</button>
      <button onClick={searchByEmail}>Email Address</button>
      <div className="profile__searchBox">
        <form onSubmit={searchProfiles}>
          <ContactEditor searchBy={searchBy} onChange={updateSearchField} />
          {/* <SearchEditor value={value} searchBy={searchBy} onChange={updateSearchField} /> */}
          <input type="submit" value="Search" />
        </form>
      </div>
    </Fragment>
  );
};

export default ProfileSearch;
