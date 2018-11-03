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
      loading: false,
    };

    this.filterBooks = this.filterBooks.bind(this);
    this.filterColors = this.filterColors.bind(this);
  }

// componentDidMount() {
//     const books = this.props.match.params.books;
//     this.setState({ loading: true });
// axios
//       .get(`https://the-index-api.herokuapp.com/api/books/`)
//       .then(res => res.data)
//       .then(book => this.setState({ books: books, loading: false }))
//       .catch(err => console.error(err));
//   }

  filterBooks(query) {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book => {
      return `${book.title} ${book.color}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredBooks, check: false });
  }

  filterColors(color) {
      return this.state.filteredBooks.filter(book => book.color === color);
    }


  render() {
    console.log(this.props.match)
    const bookColor = this.props.match.params.color;
    console.log("color: "+ bookColor);
    let books;
    if(!bookColor)
    {
     books = this.state.filteredBooks;
    }
    else {
     books = this.filterColors(bookColor);
    }


      return (
        <div className="books">
        <SearchBar changeHandler={this.filterBooks} />
        <BookTable books={books} />
        </div>

      );
    }
}

export default BookList;
