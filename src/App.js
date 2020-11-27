import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/main/Header";
import MainContentSection from "./components/main/MainContentSection";
import Footer from "./components/main/Footer";
import { UserProvider } from "./components/authorization/UserContext";

const App = () => {
  return (
    <UserProvider>  
      <Router>
        <header className="header__container">
          <Header />
        </header>
        <main>
          <MainContentSection />
        </main>
        <footer className="main__footer">
          <Footer />
        </footer>
      </Router>
    </UserProvider>
  );
};

export default App;
