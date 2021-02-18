import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/root/Header";
import MainContentSection from "./components/root/MainContentSection";
import Footer from "./components/root/Footer";
import { ImpersonatorProvider } from "./backend/authorization/ImpersonatorContext";
import { UserProvider } from "./backend/authorization/UserContext";
import { ThemeProvider } from "@material-ui/core";
import theme from "./styles/theme";

const App = () => {
  const [loginClick, setLoginClick] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <ImpersonatorProvider>
        <UserProvider>
          <Router>
              <Header loginClick={loginClick} setLoginClick={setLoginClick} />
            <main>
              <MainContentSection loginClick={loginClick} />
            </main>
            <footer className="main__footer">
              <Footer />
            </footer>
          </Router>
        </UserProvider>
      </ImpersonatorProvider>
    </ThemeProvider>
  );
};

export default App;
