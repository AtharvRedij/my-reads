import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Bookshelf from "./components/Bookshelf";

function App() {
  return (
    <div className="list-books">
      <Navbar />
      <div className="list-books-content">
        <div>
          <Bookshelf title={"Test"} books={[]} />
        </div>
      </div>
    </div>
  );
}

export default App;
