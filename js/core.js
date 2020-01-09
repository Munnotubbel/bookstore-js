fetch("https://api.myjson.com/bins/zyv02")
  .then(response => {
    return response.json();
  })
  .then(data => {
    controller(data);

  });

//-------------------------------------------------------------------------------Controller------------------------------XXXXX
function controller(data) {
  loadMore(data);
  postBook(data);
  addEvent();
  installSearch();
}
//-------------------------------------------------------------------------------postBook------------------------------XXXXX
function postBook(data) {
  for (var i = 0; i < data.books.length; i++) {
    //get ID of Dom area
    var shelf = document.getElementById("books");
    //wrapper for flip card
    var bookcontainer = document.createElement("div");
    bookcontainer.className = "row";
    //flip card element
    var flip = document.createElement("div");
    flip.className = "flip-card";
    flip.id = data.books[i].title;
    //flip card inner
    var books = document.createElement("div");
    books.className = "flip-card-inner";
    //flip card frontside
    var frontSide = document.createElement("div");
    frontSide.className = "flip-card-front";
    frontSide.style.css = "width: 300px; height: 300px;";
    frontSide.alt = "book";
    //flip card frontside cover
    var cover = document.createElement("img");
    cover.src = data.books[i].cover;
    //flip card backside
    var backSide = document.createElement("div");
    backSide.className = "flip-card-back";
    //title of book backside
    var title = document.createElement("h3");
    title.innerHTML = data.books[i].title;
    //descreption of book backside
    var description = document.createElement("p");
    description.innerHTML = data.books[i].description;
    //more Information Button backside
    var button = document.createElement("button");
    button.innerHTML = "More Informations";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".bs-example-modal-lg");

    button.id = "button" + i;
    button.value = i;

    //Parent element
    shelf.appendChild(bookcontainer);
    bookcontainer.appendChild(flip);
    flip.appendChild(books);
    //order of appending Elements for front
    books.appendChild(frontSide);
    frontSide.appendChild(cover);
    //order of appending Elements for front
    books.appendChild(backSide);
    backSide.appendChild(title);
    backSide.appendChild(description);
    backSide.appendChild(button);
  }
}
//-------------------------------------------------------------------------------load more------------------------------XXXXX
function loadMore(data) {
  var more = document.getElementById("dingding");
  for (var i = 0; i < data.books.length; i++) {
    //-------------Add Carousel Element
    var carouselItem = document.createElement("section");
    carouselItem.className = "carousel-item";
    carouselItem.id = "car" + i;
    carouselItem.name = i;
    carouselItem.style.display = ""

    //to Dom
    more.appendChild(carouselItem);
    //--------------Add IMG Wrapper
    var imgWrapper = document.createElement("div");
    imgWrapper.className = "container";
    //to Dom
    carouselItem.appendChild(imgWrapper);
    //-------------Add Image to Carousel
    var moreIMG = document.createElement("img");
    moreIMG.className = "d-block w-100";
    moreIMG.src = data.books[i].detail;
    moreIMG.className = "moreIMG_scale";
    //to Dom
    imgWrapper.appendChild(moreIMG);
    //------------Add Title on Carousel
    var backTitleBox = document.createElement("h3");
    backTitleBox.innerHTML = data.books[i].title;
    backTitleBox.className = "carousel-detail-Title";
    //to Dom
    carouselItem.appendChild(backTitleBox);
    //------------Add Descreption to Carousel
    var backTextBox = document.createElement("p");
    backTextBox.innerHTML = data.books[i].description;
    backTextBox.className = "carousel-detail-Text";
    carouselItem.appendChild(backTextBox);
  }
  console.log("--Carousel addet--");
}
//-------------------------------------------------------------------------------add Button Event------------------------------XXXXX
function addEvent() {
  var buttons = Array.from(document.getElementsByTagName("button"));
  for (var i = 0; i < buttons.length; i++) {
    //gets the index of the book and saves it in a var
    buttons[i].addEventListener("click", function () {
      var fired_button = "car" + $(this).val();
      changeActive(fired_button);
    });
  }
  console.log("--Eventlistener installed--");
}
//-------------------------------------------------------------------------------change Active------------------------------XXXXX
function changeActive(fired_button) {
  var classCar = document.getElementsByClassName("carousel-item");
  for (var i = 0; i < classCar.length; i++) {
    //makes all carousel-items to normal with out active state
    document
      .getElementsByClassName("carousel-item")[i].setAttribute("class", "carousel-item");
  }
  //adds active class to the book which is selected
  document
    .getElementById(fired_button)
    .setAttribute("class", "carousel-item active");
}
//-------------------------------------------------------------------------------Filter Text------------------------------XXXXX

function installSearch() {
  // Get input element
  let filterInput = document.getElementById("myInput");
  // Add event listener
  filterInput.addEventListener("keyup", filterNames);
  console.log("--serachbar installed--");
}

function filterNames() {
  // Get value of input
  let filterValue = document.getElementById("myInput").value.toUpperCase();

  // Get carousel items div
  let id = document.getElementById("books");
  let id2 = document.getElementById("dingding")
  // Get book div's
  let div = id.querySelectorAll("div.row");
  let div2 = id2.querySelectorAll("section")

  // Loop through book titles
  for (let i = 0; i < div.length; i++) {
    let h3 = div[i].getElementsByTagName("h3")[0];
    // If matched
    if (h3.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }

  //display none carousel items when it dont match the used search
  for (let j = 0; j < div2.length; j++) {
    let h3c = div2[j].getElementsByTagName("h3")[0];
    // If matched
    if (h3c.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      div2[j].style.display = "";
      div2[j].className = "carousel-item"
    } else {
      div2[j].style.display = "none";
      div2[j].className = ""
    }
  }
}
console.log(document.getElementsByTagName("section"))