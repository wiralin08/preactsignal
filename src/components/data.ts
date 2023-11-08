import { signal, computed } from '@preact/signals-react'

export type booksType = {
    bookName: string
    typeBook: string
    borrowed: boolean
    id: number
}
export type borrowedBooksType = {
    bookName: string
    typeBook: string
    id: number
}

export const listBooks = signal<booksType[]>([])

export const borrowBook = signal<borrowedBooksType[]>([])
export const borrowedBooks = signal<borrowedBooksType[]>([])
export const totalBorrowed = computed(() => borrowedBooks.value.length)
