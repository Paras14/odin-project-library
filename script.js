let myLibrary = [];

function Book(bookName) {
    this.bookName = bookName;
}

function addBookToLibrary(bookName){
    myLibrary.push(bookName);
}