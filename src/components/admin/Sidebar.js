import React from 'react'
// import Date from "./Date";
import SidebarLinks from './SidebarLinks'
import QuickStats from "./QuickStats";


function Sidebar() {
  return(
    <div>
      <QuickStats />
      {/* <Date /> */}
      <SidebarLinks />
    </div>
  )
}

export default Sidebar; 