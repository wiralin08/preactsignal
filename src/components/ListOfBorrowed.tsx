import { FC } from "react";
import { borrowedBooks, totalBorrowed, listBooks } from "./data";
import { Button } from "antd";
import axios from "axios";

const ListOfBorrower: FC = () => {
  const handleCancel = (id: number) => {
    axios
      .patch(`http://localhost:2000/books/${id}`, { borrowed: false })
      .then(() => {
        axios
          .get("http://localhost:2000/books")
          .then((res) => {
            listBooks.value = res.data;
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      });

    axios.delete(`http://localhost:2000/borrowed_book/${id}`).then(() => {
      axios
        .get("http://localhost:2000/borrowed_book")
        .then((res) => {
          borrowedBooks.value = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="list-of-books mt-1">
      <h2>Borrowed Books</h2>
      <h4>Total borrowed books: {totalBorrowed}</h4>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Book Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.value.length > 0 ? (
            borrowedBooks.value?.map((book, idx) => (
              <tr key={idx}>
                <td align="center">{idx + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.typeBook}</td>
                <td align="center">
                  <Button onClick={() => handleCancel(book.id)}>Cancel</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ textAlign: "center", height: "40px" }} colSpan={6}>
                Data Buku Belum Ada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfBorrower;
