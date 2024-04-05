const accessKey = "Ue3CQXD3RB4yrdxoaRVTZqfBWq7HJhBFStJPUNylakk"

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-result");
const btn = document.getElementById("show-more-button");

let page = 1;
let imageInput = ""

async function searchImages(){
    imageInput = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${imageInput}`;
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    if (page==1)
    {
       searchResultEl.innerHTML = ""; 
    }
    // everything below this requires understanding ----
    const results = data.results;
    results.map((result)=>{
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-results");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.innerHTML
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEl.appendChild(imageWrapper);
});
    page++
    if (page > 1)
    {
        btn.style.display = "block";
    }

}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    searchImages();
})

btn.addEventListener("click",()=>{
    searchImages();
})