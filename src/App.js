import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/main/Header";
import MainContentSection from "./components/main/MainContentSection";
import Footer from "./components/main/Footer";
import { UserProvider } from "./components/authorization/UserContext";

const App = () => {
  const [loginClick, setLoginClick] = useState(false);

  return (
    <UserProvider>
      <Router>
        <header className="header__container">
          <Header loginClick={loginClick} setLoginClick={setLoginClick} />
        </header>
        <main>
          <MainContentSection loginClick={loginClick} />
        </main>
        <footer className="main__footer">
          <Footer />
        </footer>
      </Router>
    </UserProvider>
  );
};

export default App;
