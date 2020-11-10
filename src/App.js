import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/main/Header";
import AdvertHero from "./components/main/AdvertHero";
import Footer from "./components/main/Footer";

function App() {
  // create state for authentication
  const [auth, setAuth] = useState([]);

  return (
    <Router>
      <header className="header__container">
        <Header />
      </header>
      <main>
        <section>
          {/* if NOT logged in, show advertising Hero message */}
          <Route exact path="/" render={() => <AdvertHero />} />
        
        </section>
      </main>
      <footer className="main__footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
