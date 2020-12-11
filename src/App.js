import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/user/Header";
import MainContentSection from "./components/user/MainContentSection";
import Footer from "./components/user/Footer";
import { UserProvider } from "./backend/authorization/UserContext";
import { ImpersonatorProvider } from "./backend/authorization/ImpersonatorContext";

const App = () => {
  const [loginClick, setLoginClick] = useState(false);

  return (
    <UserProvider>
      <ImpersonatorProvider>
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
      </ImpersonatorProvider>
    </UserProvider>
  );
};

export default App;
