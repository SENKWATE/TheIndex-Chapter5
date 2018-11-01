import React, { Component } from "react";
import {Link} from 'react-router-dom';

// Components
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import Loading from "./Loading";
import axios from "axios";

import BookRow from "./BookRow";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredAuthors: this.props.authors,
      filteredBooks: this.props.books,
      loading: false
    };

    this.filterBooks = this.filterBooks.bind(this);
  }

componentDidMount() {
    const books = this.props.match.params.books;
    this.setState({ loading: true });
axios
      .get(`/api/books/`)
      .then(res => res.data)
      .then(book => this.setState({ books: books, loading: false }))
      .catch(err => console.error(err));
  }

  filterBooks(query) {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book => {
      return `${book.title} ${book.color}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredBooks });
  }

  render() {
      return (
        <div className="books">
        <SearchBar changeHandler={this.filterBooks} />
        <BookTable books={this.state.filteredBooks} />
        </div>

      );
    }
}

export default BookList;
