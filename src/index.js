///-----------------------------------
///----------add a toy----------------
///-----------------------------------

let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
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
  const toysMenu = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
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
  })
});







