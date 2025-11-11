import React from 'react';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const authors = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
  const publishYear = book.first_publish_year || 'Unknown Year';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="w-24 h-32 flex-shrink-0 bg-gray-200 flex items-center justify-center">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`${coverUrl ? 'hidden' : 'flex'} items-center justify-center w-full h-full bg-gray-200`}>
            <span className="text-gray-500 text-xs text-center px-2">No Cover</span>
          </div>
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            by {authors}
          </p>
          <p className="text-gray-500 text-xs">
            Published: {publishYear}
          </p>
          {book.subject && book.subject.length > 0 && (
            <p className="text-gray-500 text-xs mt-1">
              Subjects: {book.subject.slice(0, 3).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;