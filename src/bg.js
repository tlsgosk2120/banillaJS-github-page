const IMG_API_KEY = "h1LRyodCGPgn3EbTA2-h1-ZbXFqkkTqbYDXXu50ZhYM";

const body = document.querySelector("body"),
  imageContainer = body.querySelector(".js-image-description"),
  imageDescription = imageContainer.querySelector("h6");

const IMG_NUMBER = 1;

function paintImage() {
  fetch(
    // `https://api.unsplash.com/photos/random?client_id=${IMG_API_KEY}&count=${IMG_NUMBER}&w=2400&h=900&dpr=2`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.forEach(function (data) {
        const loadImageDescription = data.alt_description;
        console.log("loadImageDescription : ", loadImageDescription);
        imageDescription.innerText = loadImageDescription;

        body.style.setProperty(
          "background-image",
          `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${data.urls.regular}")`
        );
      });
    });
}

function init() {
  paintImage();
}

init();
