import axios from "axios";
import Navbar from "./components/Navbar";
import ListOfBooks from "./components/ListOfBooks";
import ListOfBorrower from "./components/ListOfBorrowed";
import { listBooks, borrowedBooks, totalBorrowed } from "./components/data";
import { effect } from "@preact/signals-react";

const BookStore = () => {
  /* ----- Get Data Books ----- */
  const getDataBooks = () => {
    axios
      .get("http://localhost:2000/books")
      .then((res) => {
        listBooks.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* ----- Getd Data Borrowed Books ----- */
  const getDataBorrowed = () => {
    axios
      .get("http://localhost:2000/borrowed_book")
      .then((res) => {
        borrowedBooks.value = res.data;
        totalBorrowed.value = borrowedBooks.value.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  effect(() => {
    getDataBooks();
    getDataBorrowed();
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <ListOfBooks />
        <ListOfBorrower />
      </div>
    </>
  );
};

export default BookStore;
