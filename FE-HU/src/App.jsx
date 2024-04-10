import React from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
} from "./components";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";
import Login from "./components/Login.jsx";
import BestSeller from "./components/BestSeller.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Cart />

      <main className="flex flex-col gap-16 relative mb-12">
        <Hero heroapi={heroapi} />
        <BestSeller endpoint={toprateslaes} />
        <Sales endpoint={toprateslaes} />
        <Login />
      </main>
    </>
  );
};

export default App;
