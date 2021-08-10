//Global Variables
let city;
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const savedSearches = document.getElementById("savedsearch")
const saved = document.getElementById("savedZone")
let temp = null;
let cloudy;
const saveBtn = document.getElementById("saveBtn")
const gif = document.getElementById("gif")

//display temp on DOM
const parentTemp = document.getElementById("temp")
const displayTemp = document.createElement("p")
parentTemp.appendChild(displayTemp);
//display sky description on DOM
const parentSky = document.getElementById("parentSky")
const displaySkyDesscription = document.createElement("p")
parentSky.appendChild(displaySkyDesscription)

searchBtn.addEventListener("click", function(){
    city = searchBar.value;
    updateCity();
})


//Funtion that fetches city weather
function updateCity(){
    console.log(city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=87e1c55916df464d2d654a88e77a612f`,
    {mode: "cors"})
    .then((res)=> res.json())
    .then((res)=> {
        console.log(res);
        temp = res.main.temp;
        cloudy = res.weather[0].description;
        displaySkyDesscription.textContent = cloudy;
        displayTemp.textContent = Math.round(temp)+ "\xB0"

        //display on recent searches
        let newSearch = document.createElement("button");
        newSearch.innerText= city;
        newSearch.style.alignContent = "left"
        savedSearches.appendChild(newSearch)
        newSearch.addEventListener("click", (e)=> {
            city = e.target.textContent;
            searchBar.value = city;
            updateCity()
        })
        updateGif()

    })
    .catch((res) => console.log(res))
}
saveBtn.addEventListener("click", (e)=> {
    let newSave = document.createElement("h4");
    newSave.style.backgroundColor = "yellow"
    newSave.innerText= city;
    savedZone.appendChild(newSave)
    newSave.addEventListener("click", (e)=> {
        city = e.target.textContent;
        searchBar.value = city;
        updateCity()
    })
})

function updateGif(){
    fetch(`https://api.giphy.com/v1/gifs/translate?s=${cloudy}&api_key=UQ2J18R80nUXcLiuWDrkGsXkC1S5HqZr`,
    {mode: "cors"})
    .then((res)=> res.json())
    .then((res)=> {
        gif.src = res.data.images.fixed_width.url
        console.log(res)
    })
}
