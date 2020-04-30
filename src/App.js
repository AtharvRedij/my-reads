import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Bookshelf from "./components/Bookshelf";
import { getAll, update } from "./BooksAPI";

class App extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const result = await getAll();
    const books = result.map((book) => this.mapToViewModel(book));
    this.setState({ books });
  }

  mapToViewModel = (book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.authors[0],
      imageUrl: book.imageLinks.thumbnail,
      shelf: book.shelf,
    };
  };

  handleShelfSelect = async (book, newShelf) => {
    const id = book.id;
    const result = await update(book, newShelf);

    let { books } = { ...this.state };
    if (newShelf === "none") {
      books = books.filter((book) => book.id !== id);
    } else {
      const currentBook = books.find((book) => book.id === id);
      currentBook.shelf = newShelf;
    }

    this.setState({ books });
  };

  render() {
    const { books } = this.state;

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
              onShelfSelect={this.handleShelfSelect}
            />
            <Bookshelf
              title={"Want To Read"}
              books={wantToReadBooks}
              onShelfSelect={this.handleShelfSelect}
            />
            <Bookshelf
              title={"Read"}
              books={readBooks}
              onShelfSelect={this.handleShelfSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
