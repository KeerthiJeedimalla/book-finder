import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No books found. Try searching for a book title, author, or subject.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {books.map((book, index) => (
        <BookCard key={`${book.key}-${index}`} book={book} />
      ))}
    </div>
  );
};

export default BookList;