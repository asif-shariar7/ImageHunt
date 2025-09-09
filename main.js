const accessKey = "ispg8Fcs-askVmOboJF0I2KY9zctC1u2Z7K_xiNg5es";

const formE1 = document.querySelector("form");
const searchInputE1 = document.getElementById("search-input");
const searchResultE1 = document.querySelector(".search-results");
const showMoreButtonE1 = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = searchInputE1.value;

    if (inputData === "") {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try { 
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResultE1.innerHTML = "";
    }

    const results = data.results;
    results.map ((res) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = res.urls.small;
        image.alt = res.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = res.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultE1.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMoreButtonE1.style.display = "block";
    }  
    
} catch (error) {
    searchResultE1.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    showMoreButtonE1.style.display = "none";
}

}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMoreButtonE1.addEventListener("click", () => {
    searchImage();
});