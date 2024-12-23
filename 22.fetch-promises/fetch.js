const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById('load-more-btn');

//Make a GET request
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
.then((res) => res.json())
.then ((data) => {
    const authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex))
})
.catch(err => {
    authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`
});
// add 8 authors at a time,
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

//make the Load More Authors button fetch more authors
const fetchMoreAuthors = () => {
    startingIndex += 8;
    endingIndex += 8;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex))
    if (authorDataArr.length <= endingIndex) {
        loadMoreBtn.disabled = true;
        //Access the style property of the Load More Authors button and set cursor to "not-allowed".
        loadMoreBtn.style.cursor = "not-allowed";
        //Change the text content of the Load More Authors button to "No more data to load".
    
    loadMoreBtn.textContent = "No more data to load";
    }
};

//create a function to populate the UI with the author data
const displayAuthors = (authors) => {
    authors.forEach(({author, image, url, bio}, index) => {
        authorContainer.innerHTML += `
          <div id="${index}" class="user-card">
            <h2 class="author-name">${author}</h2>
            <img class="user-img" src="${image}" alt="${author} avatar"/>
            <div class="purple-divider"></div>
            <p class="bio">${bio.length > 50? bio.slice(0, 50) + '...' : bio}</p>
            <p class="bio">${bio}</p>
            <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
          </div>
        `
    });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);
