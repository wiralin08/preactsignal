import axios from 'axios'
import { FC, ReactNode } from 'react'
import { Button } from 'antd'
import {
    borrowedBooksType,
    listBooks,
    borrowedBooks,
    borrowBook,
} from './data'

const ListOfBooks: FC = () => {
    const handleBorrow = (id: number, bookName: string, typeBook: string) => {
        listBooks.value[id - 1].borrowed = true
        borrowBook.value = [listBooks.value[id - 1]]
        borrowedBooks.value = [...borrowedBooks.value, listBooks.value[id - 1]]

        axios
            .patch(`http://localhost:2000/books/${id}`, { borrowed: true })
            .then(() => {
                axios
                    .get('http://localhost:2000/books')
                    .then(res => {
                        listBooks.value = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        const reqData: borrowedBooksType = {
            bookName,
            typeBook,
            id,
        }
        axios
            .post(`http://localhost:2000/borrowed_book`, reqData)
            .then(() => {})
    }

    let dataBooks: ReactNode
    if (listBooks.value.length > 0) {
        dataBooks = listBooks.value?.map((book, idx) => (
            <tr key={idx}>
                <td align='center'>{idx + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.typeBook}</td>
                <td align='center'>
                    <Button
                        onClick={() =>
                            handleBorrow(book.id, book.bookName, book.typeBook)
                        }
                        disabled={book.borrowed ? true : false}
                    >
                        borrow
                    </Button>
                </td>
            </tr>
        ))
    } else {
        dataBooks = (
            <tr>
                <td style={{ textAlign: 'center', height: '40px' }} colSpan={6}>
                    Data Buku Belum Ada
                </td>
            </tr>
        )
    }
    return (
        <div className='list-of-books'>
            <h2>List Of The Books</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Book Name</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{dataBooks}</tbody>
            </table>
        </div>
    )
}

export default ListOfBooks
