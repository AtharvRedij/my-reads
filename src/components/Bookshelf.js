import React from "react";
import "./Bookshelf.css";
import Book from "./Book";

const Bookshelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ title, author }, index) => {
            return (
              <li>
                <Book title={title} author={author} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
