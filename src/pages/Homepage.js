import React, { Component } from "react";
import Bookshelf from "./../components/Bookshelf";
import Navbar from "./../components/Navbar";
import { withRouter } from "react-router-dom";
import "./Homepage.css";

class Homepage extends Component {
  render() {
    const { history } = this.props;

    const { books, onShelfSelect } = this.props;

    const currentlyReadingBooks = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
    const readBooks = books.filter((book) => book.shelf === "read");

    return (
      <div className="list-books">
        <Navbar />
        <div className="list-books-content">
          <div>
            <Bookshelf
              title={"Currently Reading"}
              books={currentlyReadingBooks}
              onShelfSelect={onShelfSelect}
            />
            <Bookshelf
              title={"Want To Read"}
              books={wantToReadBooks}
              onShelfSelect={onShelfSelect}
            />
            <Bookshelf
              title={"Read"}
              books={readBooks}
              onShelfSelect={onShelfSelect}
            />
          </div>
        </div>
        <div className="open-search">
          <button
            onClick={() => {
              history.replace("/search");
            }}
          >
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Homepage);
