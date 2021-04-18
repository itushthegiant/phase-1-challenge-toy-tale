///-----------------------------------
///----------add a toy----------------
///-----------------------------------
let addToy = false;
const toysMenu = document.getElementById("toy-collection");
const toyName = document.getElementById("toy-name");
const toyImg = document.getElementById("toy-url");
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const submitToy = document.getElementsByClassName("submit");
      submitToy.addEventListener('submit', (event) => {
        event.preventDefault();
        postToy();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });




  ///-----------------------------------
  ///------------"GET" toys-------------
  ///-----------------------------------
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => getToys(data))
    

  function getToys(data) {
    for (i = 0; i < data.length; i++) {
      const toy = document.createElement('div');
      toy.setAttribute("class", "card");
      const h2 = document.createElement("h2");
      h2.innerText = `${data[i].name}`
      const img = document.createElement("img");
      img.setAttribute("class", "toy-avatar");
      img.setAttribute("src", `${data[i].image}`);
      const p = document.createElement('p');
      p.innerText = `${data[i].likes} Likes`;
      const likeButton = document.createElement('button');
      likeButton.setAttribute("class", "like-btn");
      likeButton.setAttribute('id', `${data[i].id}`);
      likeButton.innerText = "Like";
      toysMenu.append(toy);
      toy.append(h2, img, p, likeButton);
    }
  }


  
  function postToy() {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
  
      body: JSON.stringify({
        "name": `${toyName.value}`,
        "image": `${toyImg.value}`,
        "likes": 0
      }) 
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  function renderToy(data) {
    
  }





  


});









