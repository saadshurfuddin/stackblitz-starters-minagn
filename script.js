const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const readingListContainer = document.getElementById('readingList');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  searchBooks(query);
});

function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${query}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data.docs))
    .catch((error) => console.error('Error fetching data:', error));
}

function displayResults(books) {
  resultsContainer.innerHTML = '';
  books.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book';

    const coverImage = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://via.placeholder.com/100x150?text=No+Cover';

    bookElement.innerHTML = `
            <img src="${coverImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${
              book.author_name ? book.author_name.join(', ') : 'Unknown'
            }</p>
            <p><strong>Published:</strong> ${
              book.first_publish_year || 'Unknown'
            }</p>
            <button class="addToReadingList">Add to Reading List</button>
        `;

    bookElement
      .querySelector('.addToReadingList')
      .addEventListener('click', () => addToReadingList(book));
    resultsContainer.appendChild(bookElement);
  });
}

function addToReadingList(book) {
  const listItem = document.createElement('li');
  listItem.textContent = `${book.title} by ${
    book.author_name ? book.author_name.join(', ') : 'Unknown Author'
  }`;
  readingListContainer.appendChild(listItem);
}
