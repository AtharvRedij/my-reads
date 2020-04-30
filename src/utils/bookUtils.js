const GENERAL_BOOK_IMG =
  "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/book-128.png";

export const mapToViewModel = (book, shelf = "") => {
  return {
    id: book.id,
    title: book.title,
    author: book.author
      ? book.author
      : book.authors
      ? book.authors[0]
      : "No Author",
    imageUrl: book.imageLinks ? book.imageLinks.thumbnail : GENERAL_BOOK_IMG,
    shelf: shelf ? shelf : book.shelf,
  };
};
