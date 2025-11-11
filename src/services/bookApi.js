const API_BASE_URL = 'https://openlibrary.org/search.json';

export const searchBooks = async (query) => {
  if (!query || query.trim() === '') {
    return { docs: [] };
  }

  try {
    const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}&limit=20`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to search books. Please try again.');
  }
};