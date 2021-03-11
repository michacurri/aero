import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/root/Header";
import MainContentSection from "./components/root/MainContentSection";
import Footer from "./components/root/Footer";
import { ImpersonatorProvider } from "./backend/authorization/ImpersonatorContext";
import { UserProvider } from "./backend/authorization/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "15vh",
    // maxWidth: "900px",
    padding: "2rem",
    backgroundColor: "#212529",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // width: "90%",
    // maxWidth: "1200px",
    margin: "0 auto",
    height: "70vh",
    backgroundColor: "gray",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "15vh",
    padding: "2rem",
    backgroundColor: "#212529",
  },
}));

const App = () => {
  const classes = useStyles();
  const [loginClick, setLoginClick] = useState(false);

  return (
    <ImpersonatorProvider>
      <UserProvider>
        <Router>
          <header className={classes.header}>
            <Header loginClick={loginClick} setLoginClick={setLoginClick} />
          </header>
          <main className={classes.main}>
            <MainContentSection loginClick={loginClick} />
          </main>
          <footer className={classes.footer}>
            <Footer />
          </footer>
        </Router>
      </UserProvider>
    </ImpersonatorProvider>
  );
};

export default App;
