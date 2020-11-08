import React from 'react'
import Date from "./Date";
import SidebarLinks from './SidebarLinks'
import QuickStats from "./QuickStats";


function Sidebar() {
  return(
    <div id="sidebar">
      <Date />
      <SidebarLinks />
      <QuickStats />
    </div>
  )
}

export default Sidebar; 