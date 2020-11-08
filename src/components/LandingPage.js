import React, { Fragment } from "react";
import Sidebar from './Sidebar'
import Header from './Header'
import Form from './Form'

function LandingPage() {
  return(
    <Fragment>
        <Sidebar />
        <Header />
        <Form />
    </Fragment>
  );
}

export default LandingPage;
