let myLibrary = ['That Book','This Book', 'My Book'];

function Book(bookName) {
    this.bookName = bookName;
}

function addBookToLibrary(bookName){
    myLibrary.push(bookName);
}

function displayBooks(){
    const booksContainer = document.querySelector('.books-container');
    
    myLibrary.forEach(element => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        const headThree = document.createElement('h3');
        headThree.innerHTML = element;
        bookCard.appendChild(headThree);
        booksContainer.appendChild(bookCard); 
    });
}

displayBooks();