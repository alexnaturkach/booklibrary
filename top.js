let myLibrary = [];
const inProgressBooks = document.querySelector('.inProgress');
const finishedBooks = document.querySelector('.finished');


showBooks();

function Book(title, author, onPage, totalPages) {
  this.title = title;
  this.author = author;
  this.onPage = onPage;
  this.totalPages = totalPages;
  this.info = function() {
    return this;
  }
}


function addBookToLibrary() {
  let a = document.getElementById('bookTitle').value;
  let b = document.getElementById('authorName').value;
  let c = document.getElementById('onPage').value;
  let d = document.getElementById('numOfPages').value;
  myLibrary.push(new Book(a, b, c, d));
  showBooks();
}


function showBooks() {
  inProgressBooks.innerHTML = '';
  finishedBooks.innerHTML = '';
  for (i = 0; i < myLibrary.length; i++) {
    if (Number(myLibrary[i].onPage) < Number(myLibrary[i].totalPages)) {
      let newP = document.createElement('li');
      let pText = document.createTextNode(myLibrary[i].title + ' by ' + myLibrary[i].author);
      newP.appendChild(pText);
      let xMarker = document.createElement('span');
      xMarker.innerHTML = 'Delete';
      xMarker.classList.add('delete');
      newP.appendChild(xMarker);
      newP.classList.add('books');
      inProgressBooks.prepend(newP);
    } else if (Number(myLibrary[i].onPage) === Number(myLibrary[i].totalPages)) {
      let newP = document.createElement('li');
      let pText = document.createTextNode(myLibrary[i].title + ' by ' + myLibrary[i].author);
      newP.appendChild(pText);
      let xMarker = document.createElement('span');
      xMarker.innerHTML = 'Delete';
      xMarker.classList.add('delete');
      newP.appendChild(xMarker);
      newP.classList.add('books');
      finishedBooks.prepend(newP);
    }

  }

  let isEmpty = [inProgressBooks, finishedBooks];
  for (i=0; i<isEmpty.length; i++){
    if (!isEmpty[i].firstChild){
      let newP = document.createElement('li');
        let pText = document.createTextNode("< Empty >");
        newP.classList.add('empty');
        newP.appendChild(pText);
        isEmpty[i].prepend(newP);
    }
  }
};
