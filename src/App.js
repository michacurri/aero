import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/root/Header";
import MainContentSection from "./components/root/MainContentSection";
import Footer from "./components/root/Footer";
import { ImpersonatorProvider } from "./backend/authorization/ImpersonatorContext";
import { UserProvider } from "./backend/authorization/UserContext";

const App = () => {
  const [loginClick, setLoginClick] = useState(false);

  return (
    <ImpersonatorProvider>
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
    </ImpersonatorProvider>
  );
};

export default App;
