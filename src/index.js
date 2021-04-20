///-----------------------------------
///----------add a toy----------------
///-----------------------------------
let addToy = false;
const toysMenu = document.getElementById("toy-collection");
const toyName = document.getElementById("toy-name");
const toyImg = document.getElementById("toy-url");
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
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

  
  ///-----------------------------------
  ///------------"POST" toys------------
  ///-----------------------------------
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
    .then(data => renderToy(data))
  }
  
  function renderToy(data) {
    toysMenu.append(data);
  }
  
  const submitToy = document.getElementById('submit-form');
  submitToy.addEventListener('submit', (event) => {
    postToy();
    event.target.reset()
  })




  ///-----------------------------------
  ///------------"PATCH" toys-----------
  ///-----------------------------------

 toysMenu.addEventListener('click', (e) => {
   if (e.target.className === 'like-btn') {
     console.log(e.target.previousElementSibling)
    updateLikes(e.target.id, e);
    
   }
 })


 function newLikes(data, p) {
  for (i = 0; i < data.length; i++) {
    p.innerText = `${data.likes.value} Likes`;
  }

 }


function updateLikes(id, e) {
  const likePTag = e.target.previousElementSibling;
  let numberLikes = e.target.previousElementSibling.innerHTML.split(" ")[0];
  let number = parseInt(numberLikes);
  if (number === NaN) {
    number = 0;
  }
  e.target.previousElementSibling.innerHTML = ++number + " Likes";
  e.preventDefault();
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": number
    }) 
  })
  .then(resp => resp.json())
  .then(data => newLikes(data, likePTag))
}



});









