let myLibrary = [];
const inProgressBooks = document.querySelector('.inProgress');
const finishedBooks = document.querySelector('.finished');


showBooks();

function Book(title, author, onPage, totalPages) {
  this.title = title;
  this.author = author;
  this.onPage = onPage;
  this.totalPages = Number(totalPages);
  this.info = function() {
    return this;
  }
}

function clearForm() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('authorName').value = '';
  document.getElementById('onPage').value = '';
  document.getElementById('numOfPages').value = '';
}

function addBookToLibrary() {
  let a = document.getElementById('bookTitle').value;
  let b = document.getElementById('authorName').value;
  let c = document.getElementById('onPage').value;
  let d = document.getElementById('numOfPages').value;
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === a) {
      let confirmation = confirm('This will edit an existing book in your library. Confirm?')
      if (confirmation) {
        myLibrary.splice(i, 1);
        myLibrary[i] = new Book(a, b, c, d);
        showBooks();
        overlayOff();
        clearForm();
        return;
      }
    }
  }
  if (c > d) {
    alert("Your current page can't be higher than the total number of pages in the book");
    return;
  }
  if (a !== '' & b !== '' & c !== '' & d !== '') {
    myLibrary.push(new Book(a, b, c, d));
    clearForm();
    showBooks();
    document.getElementById("overlay").style.display = "none";
  } else {
    alert('fill out everything!');
  }
}
//List generator for book tables
function addABook() {
  let newP = document.createElement('li');
  let titleDiv = document.createElement('p');
  titleDiv.setAttribute('id', 'titleDiv');
  let pagesDiv = document.createElement('p');
  let plus = document.createElement('span');
  let minus = document.createElement('span');
  plus.classList.add('plus');
  minus.classList.add('minus');
  plusText = document.createTextNode('+');
  minusText = document.createTextNode('-');
  plus.appendChild(plusText);
  minus.appendChild(minusText);
  pagesDiv.setAttribute('id', 'pagesDiv');

  let pagesDivText = document.createTextNode("pages: " + myLibrary[i].onPage + " / " + myLibrary[i].totalPages);
  pagesDiv.appendChild(pagesDivText);
  pagesDiv.appendChild(minus);
  pagesDiv.appendChild(plus);
  let titleDivText = document.createTextNode(myLibrary[i].title);
  titleDiv.appendChild(titleDivText);
  let xMarker = document.createElement('span');
  xMarker.innerHTML = 'X';
  xMarker.classList.add('delete');
  let progressBar = document.createElement('div');
  progressBar.classList.add('progressBar');
  progressBar.style.width = (myLibrary[i].onPage / myLibrary[i].totalPages) * 100 + "%";
  newP.appendChild(xMarker);
  newP.appendChild(titleDiv);
  newP.appendChild(pagesDiv);
  newP.appendChild(progressBar);
  newP.classList.add('books');
  return newP;
}
// Loop through library and display books in their according lists
function showBooks() {
  inProgressBooks.innerHTML = '';
  finishedBooks.innerHTML = '';
  for (i = 0; i < myLibrary.length; i++) {
    if (Number(myLibrary[i].onPage) < myLibrary[i].totalPages) {
      addABook();
      inProgressBooks.prepend(addABook());
    } else if (Number(myLibrary[i].onPage) === Number(myLibrary[i].totalPages)) {
      addABook();
      finishedBooks.prepend(addABook());
    } // add To Read logic here

  }

  let isEmpty = [inProgressBooks, finishedBooks];
  for (i = 0; i < isEmpty.length; i++) {
    if (!isEmpty[i].firstChild) {
      let newP = document.createElement('li');
      let pText = document.createTextNode("< Empty >");
      newP.classList.add('empty');
      newP.appendChild(pText);
      isEmpty[i].prepend(newP);
    }
  }
};

//delete from Library
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    let parentTitle = e.target.nextSibling.textContent;
    for (i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === parentTitle) {
        let confirmation = confirm("Are you sure you want to remove it?");
        if (confirmation) {
          myLibrary.splice(i, 1);
          showBooks();
          return;
        }
      }
    }
  }
})
//edit book function
document.addEventListener('click', (e) => {
  let targetParent = e.target.parentNode;
  let parentNodeChildren = targetParent.getElementsByTagName('p');
  let titleNode = parentNodeChildren[0];
  let bookHover_1 = document.getElementById('titleDiv');
  let bookHover_2 = document.getElementById('pagesDiv');
  if (e.target === bookHover_1 || e.target === bookHover_2) {
    for (i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === titleNode.innerText) {
        document.getElementById('bookTitle').value = myLibrary[i].title;
        document.getElementById('authorName').value = myLibrary[i].author;
        document.getElementById('onPage').value = myLibrary[i].onPage;
        document.getElementById('numOfPages').value = myLibrary[i].totalPages;
      }
    }
    overlayOn();
  }
})


//move one page up
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('plus')) {
    let parentNode = e.target.parentNode.previousSibling.textContent;
    for (i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === parentNode) {
        myLibrary[i].onPage++;
        if (myLibrary[i].onPage === myLibrary[i].totalPages) {
          showBooks();
        } else {
          e.target.previousSibling.previousSibling.textContent = "pages: " + myLibrary[i].onPage + " / " + myLibrary[i].totalPages;
          e.target.parentNode.nextSibling.style.width = (myLibrary[i].onPage / myLibrary[i].totalPages) * 100 + "%";
          return;
        }
      }
    }
  }
})
//move one page down
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('minus')) {
    let parentNode = e.target.parentNode.previousSibling.textContent;
    for (i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === parentNode & myLibrary[i].onPage > 0) {
        myLibrary[i].onPage--;
        if (myLibrary[i].onPage === myLibrary[i].totalPages - 1) {
          showBooks();
        } else {
          e.target.previousSibling.textContent = "pages: " + myLibrary[i].onPage + " / " + myLibrary[i].totalPages;
          e.target.parentNode.nextSibling.style.width = (myLibrary[i].onPage / myLibrary[i].totalPages) * 100 + "%";
          return;
        }
      }
    }
  }
})

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('form') !== true & e.target.classList.contains('button') !== true & e.target.classList.contains('formInput') !== true) {
    overlayOff();
  }
})
