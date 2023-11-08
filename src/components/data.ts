import { signal } from "@preact/signals-react";

export type booksType = {
  bookName: string;
  typeBook: string;
  borrowed: boolean;
  id: number;
};
export type borrowedBooksType = {
  bookName: string;
  typeBook: string;
  id: number;
};

export const listBooks = signal([
  {
    bookName: "",
    typeBook: "",
    borrowed: false,
    id: 0,
  },
]);

// export const ListBooksValue: booksType[] = listBooks.value;

export const borrowBook = signal([]);
export const borrowedBooks = signal([]);
export const returnBook = signal([]);
export const totalBorrowed = signal(0);
