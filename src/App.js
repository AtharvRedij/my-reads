import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Searchpage from "./pages/Searchpage";
import { mapToViewModel } from "./utils/bookUtils";
import { getAll, update } from "./utils/BooksAPI";
import "./App.css";

class App extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const result = await getAll();
      const books = result.map((book) => mapToViewModel(book));
      this.setState({ books });
    } catch (ex) {
      console.log("Error occured while fetching all books", ex);
    }
  }

  handleShelfSelect = async (book, newShelf) => {
    const id = book.id;

    try {
      await update(book, newShelf);

      let { books } = { ...this.state };
      if (newShelf === "none") {
        books = books.filter((book) => book.id !== id);
      } else {
        const currentBook = books.find((book) => book.id === id);
        currentBook.shelf = newShelf;
      }

      this.setState({ books });
    } catch (ex) {
      console.log("Error occured while updating the book", ex);
    }
  };

  handleBookAdd = (book, shelf) => {
    if (shelf === "none") return;
    const { books } = { ...this.state };
    books.push({ ...book, shelf });
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
