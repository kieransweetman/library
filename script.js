let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    this.read == true ? (this.read = "read") : (this.read = "not yet read");
    const message = `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;

    return message;
  }

  status(bookId, value) {
    return (myLibrary[bookId].this.read = value);
  }

  deleteBook(bookId) {
    let book = myLibrary[bookId];

    myLibrary.splice(book, 1);
  }

  static displayBooks(library) {
    library.forEach((book) => {
      cardGen(book);
    });

    Book.updateBooks();
  }

  static updateBooks() {
    document.querySelector("#submit").addEventListener("click", () => {
      cardGen(myLibrary[myLibrary.length - 1]);
    });
  }
}

function addBookToLibrary() {
  const form = document.querySelectorAll("input");
  let book = [];
  form.forEach((input) => {
    input.type != "checkbox"
      ? book.push(input.value)
      : book.push(Boolean(input.checked));
  });

  let toAdd = new Book(book[0], book[1], book[2], book[3]);
  return myLibrary.push(toAdd);
}

// component generator
function cardGen(book) {
  //format div

  const scroller = document.getElementById("Library");
  const div = document.createElement("div");
  const img = document.createElement("input");

  // tailwind class utilities
  let list = [
    "h-full",
    "w-1/2",
    "grow-0",
    "shrink-0",
    "border-gray-200",
    "border-2",
    "snap-center",
    "shadow-lg",
    "px-5",
    "py-5",
    "hover:shadow-xl",
    "relative",
  ];

  list.forEach((style) => {
    div.classList.add(style);
  });

  div.setAttribute("data-index", myLibrary.indexOf(book));

  // delete settings

  img.id = "delete";
  img.type = "image";
  img.src = "./icons/x-symbol-svgrepo-com.svg";

  //setting index and removing element after firing the deletebook function
  img.setAttribute(
    "onclick",
    "myLibrary[this.parentNode.getAttribute('data-index')].deleteBook(this.parentNode.getAttribute('data-index')); this.parentNode.remove();"
  );
  // css
  img.style.padding = "4px 4px";
  img.style.position = "absolute";
  img.style.height = "1em";
  img.style.top = 0;
  img.style.right = 0;

  div.appendChild(img);

  // adding book details to card
  Object.keys(book).forEach((key) => {
    if (book.title == book[key]) {
      let h1 = document.createElement("h1");
      h1.textContent = book.title;
      div.appendChild(h1);
    } else if (book.read == book[key]) {
      let val = book[key];

      let input = document.createElement("input");

      input.id = "readStatus";

      let pLabel = document.createElement("label");
      pLabel.setAttribute("for", "readStatus");
      pLabel.textContent = "Read Status";

      input.type = "checkbox";
      input.name = "status";
      input.setAttribute(
        "onchange",
        "myLibrary[this.parentNode.getAttribute('data-index')].status(this.parentNode.getAttribute('data-index'), this.checked);"
      );
      input.style.cssText = "margin-left: 1rem";

      val ? (input.checked = true) : (input.checked = false);

      div.appendChild(pLabel);
      div.appendChild(input);
    } else {
      let p = document.createElement("p");
      let val = book[key];

      p.textContent = val;
      div.appendChild(p);
    }
  });

  scroller.appendChild(div);
}

//open functions + manual adding of books
const myBooks = [
  new Book("Beautiful World, Where Are You", "Sally Rooney", 356, false),
  new Book("Dial A for Aunties", "Jesse Q. Sutanto", 299, true),
  new Book("Cloud Cuckoo Land", "Anthony Doerr", 626, false),
  new Book("Once There Were Wolves", "Charlotte McConaghy", 258, true),
];
myBooks.forEach((book) => {
  myLibrary.push(book);
});

Book.displayBooks(myLibrary);
