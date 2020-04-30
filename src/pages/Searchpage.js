import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Book from "./../components/Book";
import { search } from "../utils/BooksAPI";
import { mapToViewModel } from "./../utils/bookUtils";
import "./Searchpage.css";

class Searchpage extends Component {
  state = {
    searchQuery: "",
    books: [],
  };

  handleSearchChange = async (event) => {
    const query = event.currentTarget.value;
    this.setState({ searchQuery: query }, async () => {
      try {
        const result = await search(this.state.searchQuery);

        const books = result.map((book) => mapToViewModel(book, "none"));
        this.setState({ books });
      } catch (ex) {
        console.log("Error occured while searching", ex);
      }
    });
  };

  render() {
    const { history } = this.props;
    const { onBookAdd } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.goBack()}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books &&
              this.state.books.map((book) => {
                return (
                  <li key={book.id}>
                    <Book book={book} onShelfSelect={onBookAdd} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default withRouter(Searchpage);
