fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    console.log(response);
    if (response.ok) {
      console.log("File finded :)");
      return response.json();
    } else {
      throw new Error("Error file didnt detected");
    }
  })
  .then((books) => {
    // console.log(books, "books");
    books.forEach((book) => {
      addBookToPage(book);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function addBookToPage(book) {
  const bookList = document.getElementById("bookList");

  const column = document.createElement("div");
  column.classList.add("col-md-3", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card");

  const cardImg = document.createElement("img");
  cardImg.src = book.img;
  cardImg.classList.add("card-img-top");
  card.appendChild(cardImg);
  //   console.log(cardImg);

  const bodyCard = document.createElement("div");
  bodyCard.classList.add("card-body");

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.innerText = book.title;
  bodyCard.appendChild(title);
  //   console.log(title);

  const price = document.createElement("p");
  price.classList.add("card-text");
  price.innerText = book.price + "$";
  //   console.log(price);

  const addToCart = document.createElement("button");
  addToCart.type = "button";
  addToCart.classList.add("btn", "btn-success", "me-2");
  addToCart.innerText = "Buy";
  addToCart.onclick = () => addToCartNow(book);
  bodyCard.appendChild(addToCart);

  const removeCard = () => {
    column.remove();
  };

  const remove = document.createElement("button");
  remove.type = "button";
  remove.classList.add("btn", "btn-danger");
  remove.innerText = "remove";
  remove.onclick = removeCard;

  bodyCard.appendChild(remove);
  card.appendChild(bodyCard);
  column.appendChild(card);
  bookList.appendChild(column);
  bodyCard.appendChild(price);
}

function displayCart() {
  const cartList = document.getElementById("cartDropdown");
  const cart = JSON.parse(localStorage.getItem("cart"));

  cartList.innerHTML = "";

  if (cart) {
    cart.forEach((book, index) => {
      const cartItem = document.createElement("li");
      cartItem.innerText = book.title;
      cartItem.style.color = "white";
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.classList.add("btn", "btn-danger", "ms-2");
      removeButton.onclick = () => removeFromCart(index);

      cartItem.appendChild(removeButton);

      cartList.appendChild(cartItem);
    });
  }
}

function addToCartNow(book) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  displayCart();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

window.onload = () => {
  displayCart();
};
