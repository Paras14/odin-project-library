//Books object array
let myLibrary = [
   new Book('That Book', 'That Author', 'comedy', false),
   new Book('This Book', 'This Author', 'thriller', true),
   new Book('My Book', 'My Author', 'self-help')
    // {
    //     bookName:'That Book',
    //     author:'That Author',
    //     genre:'comedy',
    //     readStatus: false
    // },
    // {
    //     bookName:'This Book',
    //     author:'This Author',
    //     genre: 'thriller',
    //     readStatus: false
    // }, 
    // {
    //     bookName:'My Book',
    //     author:'My Author',
    //     genre:'self-help',
    //     readStatus: false
    // }
];

// let myLibrary = ['That Book', 'This Book', 'My Book'];
// let booksStatus = [false, true, false];

//Book Constructor, not in use currently
function Book(bookName, author, genre, readStatus = false) {
    this.bookName = bookName;
    this.author = author;
    this.genre = genre;
    this.readStatus = readStatus;

}

Book.prototype.toogleReadStatus = function(){
    this.readStatus = !this.readStatus
}

//To add books in the myLibrary object array, currently not in use
function addBookToLibrary(bookName, author, genre, readStatus = false){
    myLibrary.push(Book(bookName, author, genre, readStatus = false));
}

//To display the books present in myLibrary object array
function displayBooks(){
    const booksContainer = document.querySelector('.books-container');
    
    myLibrary.forEach((element, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        const headThree = document.createElement('h3');
        headThree.innerHTML = element.bookName;
        const bookOption = document.createElement('div');
        bookOption.classList.add('book-options');
        const bookDeleteButton = document.createElement('img');
        const readStatus = document.createElement('div');
        readStatus.classList.add('read-status');
        if(element.readStatus === false){
            readStatus.classList.add('not-read');
            readStatus.innerText = 'Not Read';
        }
        else{
            readStatus.classList.add('read');
            readStatus.innerText = 'Read';
        }
        bookDeleteButton.setAttribute("src","assets/delete-logo.png");
        bookDeleteButton.classList.add('delete-button');
        bookOption.appendChild(bookDeleteButton);
        bookOption.appendChild(readStatus);
        bookCard.appendChild(headThree);
        bookCard.appendChild(bookOption);
        bookCard.setAttribute("data",index);
        booksContainer.appendChild(bookCard); 
    });
}

//Add books button logic
const addBooksButton = document.querySelector('.add-books');
const formControl = document.querySelector('.form-bg');
addBooksButton.addEventListener("click",()=>{
    formControl.classList.add('form-bg-visible');
});

//To dismiss book addition form by clicking outside the form
formControl.addEventListener("click", (e)=>{
    if(e.target.className !== "add-book-form" && e.target.localName !=="form" && e.target.localName !=="input" && e.target.localName !=="label" && e.target.localName !=="select" && e.target.localName !=="option" && e.target.localName !=="br" && e.target.localName !=="button"){
        formControl.classList.remove('form-bg-visible');
    }
});

//To Put books in the DOM
displayBooks();

//Submit control for book addition form
const submitButton = document.querySelector('.add-book-form button');
submitButton.addEventListener("click", submitControl);

function submitControl(event){
    event.preventDefault();
}

//Event listener on Delete button of every book card
function deleteListener(){
    const bookDeleteButtons = document.querySelectorAll('.delete-button');
    bookDeleteButtons.forEach((button) => button.addEventListener("click", deleteBooks));
}

deleteListener();

//Function deletes the book from my library and rerenders the elements in myLibrary
function deleteBooks(event){
    myLibrary.splice(event.target.parentNode.parentNode.attributes.data.value, 1);
    reRenderBooks();
}


//Deletes all DOM elements and displays again from myLibrary object array
function reRenderBooks(){
    const booksContainer = document.querySelector('.books-container');
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }
    displayBooks();
    deleteListener();
    statusListener();
}

//Event listener for click on read status button
function statusListener(){
    const readStatusButtons = document.querySelectorAll('.read-status');
    readStatusButtons.forEach((button) => button.addEventListener('click', updateReadStatus));
}
statusListener();

//function to update read status
function updateReadStatus(event){
    myLibrary[event.target.parentNode.parentNode.attributes.data.value].toogleReadStatus();
    reRenderBooks();
    statusListener();
}