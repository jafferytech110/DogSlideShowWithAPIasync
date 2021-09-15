//fetch returns a promise
//if promises returns success then .then() gonna run
//no matter how long it takes to return a success the other code after then() will keep running and won't wait
//this is async
//.json() returns promise too

//old way of retaining data from API

// fetch("https://dog.ceo/api/breeds/list/all")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

//modern and easy syntax for API promises using async
//the beblow function is async function with async keyword in the beginning
let timer;
let deleteFirstPhotoDelay;

async function start() {
  //await is keyword here and until the fetch is successful js will not run code below inside scope {} of the func
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedList(data.message);
}

start();

//function for html creation breed list
function createBreedList(breedList) {
  //below Object.keys() will return an array of properties (objectName)
  document.querySelector("#breed").innerHTML = `
    <select onchange = "loadByBreed(this.value)">
        <option>Choose any dog breed</option>
        ${Object.keys(breedList)
          .map((breed) => {
            return `<option>${breed}</option>`;
          })
          .join("")}
    </select>
  `;
}

async function loadByBreed(breed) {
  if (breed != "Choose any dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPositon = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  document.querySelector(".slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>`;

  currentPositon += 2;
  timer = setInterval(nextSlide, 3000);

  function nextSlide() {
    document.querySelector(".slideshow").insertAdjacentElement(
      "beforeend",
      `
      <div class="slide" style="background-image: url('${images[currentPositon]}')"></div>`
    );
    deleteFirstPhotoDelay = setTimeout(() => {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPositon + 1 >= images.length) {
      currentPositon = 0;
    } else {
      currentPositon++;
    }
  }
}
