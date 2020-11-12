import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/main/Header";
import AdvertHero from "./components/main/AdvertHero";
import Footer from "./components/main/Footer";
import { UserProvider } from "./components/authorization/UserContext";
import AuthContainer from './components/authorization/AuthContainer'

function App() {
  // // create state for authentication
  // const [auth, setAuth] = useState([]);

  return (
    <UserProvider>
      <Router>
        <header className="header__container">
          <Header />
        </header>
        <main>
          <section>
            {/* if NOT logged in, show advertising Hero message */}
            <Route exact path="/" render={() => <AdvertHero />} />
            <Route path="/login" render={() => <AuthContainer />} />
          </section>
        </main>
        <footer className="main__footer">
          <Footer />
        </footer>
      </Router>
    </UserProvider>
  );
}

export default App;
