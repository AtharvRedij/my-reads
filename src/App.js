import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getAll, update } from "./BooksAPI";
import Homepage from "./pages/Homepage";
import "./App.css";
import Searchpage from "./pages/Searchpage";

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

  mapToViewModelWithShelf = (book, shelf) => {
    return {
      id: book.id,
      title: book.title,
      author: book.authors[0],
      imageUrl: book.imageLinks.thumbnail,
      shelf,
    };
  };

  handleShelfSelect = async (book, newShelf) => {
    const id = book.id;
    await update(book, newShelf);

    let { books } = { ...this.state };
    if (newShelf === "none") {
      books = books.filter((book) => book.id !== id);
    } else {
      const currentBook = books.find((book) => book.id === id);
      currentBook.shelf = newShelf;
    }

    this.setState({ books });
  };

  handleBookAdd = (book, shelf) => {
    if (shelf === "none") return;
    console.log(book, shelf);
    const { books } = { ...this.state };
    books.push(this.mapToViewModelWithShelf(book, shelf));
    this.setState({ books });
  };

  render() {
    return (
      <Switch>
        <Route
          path="/search"
          exact
          render={() => <Searchpage onBookAdd={this.handleBookAdd} />}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Homepage
              books={this.state.books}
              onShelfSelect={this.handleShelfSelect}
            />
          )}
        />

        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
