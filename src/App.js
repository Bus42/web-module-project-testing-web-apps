import React from "react";

import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div>
      <nav id="navbar" className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#navbar">
          <img
            width="40px"
            src="./Lambda-Logo-Red.png"
            alt="lambda school logo"
          />{" "}
          Lambda Integration Testing Challenge
        </a>
      </nav>
      <div className="App">
        <ContactForm />
      </div>
    </div>
  );
}
