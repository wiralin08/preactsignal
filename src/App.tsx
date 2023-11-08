import axios from 'axios'
import Navbar from './components/Navbar'
import ListOfBooks from './components/ListOfBooks'
import ListOfBorrower from './components/ListOfBorrowed'
import { listBooks, borrowedBooks } from './components/data'
import { effect } from '@preact/signals-react'

const BookStore = () => {
    /**
     * Get Books Data
     */
    const getDataBooks = () => {
        axios
            .get('http://localhost:2000/books')
            .then(res => {
                listBooks.value = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * Get Borrowed Books Data
     */
    const getDataBorrowed = () => {
        axios
            .get('http://localhost:2000/borrowed_book')
            .then(res => {
                borrowedBooks.value = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    effect(() => {
        getDataBooks()
        getDataBorrowed()
    })

    return (
        <>
            <Navbar />
            <div className='container'>
                <ListOfBooks />
                <ListOfBorrower />
            </div>
        </>
    )
}

export default BookStore
