import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchType, setSearchType] = useState('title')

  const searchBooks = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      let apiUrl = ''
      if (searchType === 'title') {
        apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`
      } else {
        apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchTerm)}`
      }

      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      
      const data = await response.json()
      
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, 12))
      } else {
        setBooks([])
        setError('No books found. Try a different search term.')
      }
    } catch (err) {
      setError('Failed to search books. Please try again.')
      setBooks([])
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBooks()
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setBooks([])
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            📚 Book Finder
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Discover your next favorite book! Search by title or author using the Open Library database.
          </p>
        </div>

        {/* Search Section - Mobile Optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
          {/* Search Type Toggle - Stack on mobile */}
          <div className="flex justify-center sm:justify-start gap-2 mb-4">
            <button
              onClick={() => setSearchType('title')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                searchType === 'title'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              By Title
            </button>
            <button
              onClick={() => setSearchType('author')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                searchType === 'author'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              By Author
            </button>
          </div>

          {/* Search Input - Stack vertically on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                searchType === 'title' 
                  ? 'Enter book title...' 
                  : 'Enter author name...'
              }
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-base sm:text-lg"
            />
            
            <div className="flex gap-2 sm:gap-4">
              <button
                onClick={searchBooks}
                disabled={loading}
                className="flex-1 px-4 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base sm:text-lg transition-colors"
              >
                {loading ? '🔍...' : 'Search'}
              </button>

              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-500 text-white rounded-xl sm:rounded-2xl hover:bg-gray-600 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-gray-200 font-semibold text-base sm:text-lg transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-red-700 text-center text-sm sm:text-base mt-4">
              {error}
            </div>
          )}
        </div>

        {/* Results Section - Mobile Optimized */}
        {books.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
              Found {books.length} Book{books.length !== 1 ? 's' : ''}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {books.map((book, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Book Cover - Fixed height for mobile */}
                  <div className="h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {book.isbn && book.isbn[0] ? (
                      <img 
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="hidden flex-col items-center justify-center text-gray-500 p-4 text-center">
                      <span className="text-2xl sm:text-4xl mb-2">📖</span>
                      <span className="text-xs sm:text-sm">No cover available</span>
                    </div>
                  </div>

                  {/* Book Info - Better mobile spacing */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {book.title || 'Untitled'}
                    </h3>
                    
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      <span className="font-semibold">By:</span>{' '}
                      {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                    </p>
                    
                    {book.first_publish_year && (
                      <p className="text-gray-500 text-xs sm:text-sm mb-2">
                        📅 Published: {book.first_publish_year}
                      </p>
                    )}
                    
                    {book.isbn && book.isbn[0] && (
                      <p className="text-gray-500 text-xs sm:text-sm">
                        📚 ISBN: {book.isbn[0]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-16">
          <p>Powered by Open Library API • Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default App