// Array where the books are stored
const myLibrary = [];

// variables
const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('.close-dialog');
const addBook = document.querySelector('.add-book');
const submitBtn = document.querySelector('.submit-btn');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatus = document.querySelector('#status');

// Constructor for making Book objects
function Book(title, author, pages, status) {
    // throws error if the constructor is created without the new operator
    if (!new.target) {
        throw Error("You can only call this object with the 'new' operator");
    }

    this.id = crypto.randomUUID(); // generates a random ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Prototype function for changing the book status
Book.prototype.changeStatus = function () {
    if (this.status === 'Read') {
        this.status = 'Not read';
    } else {
        this.status = 'Read';
    }
}

// Adds books to the myLibrary array
function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

// Displays each book in the myLibrary array onto the webpage
function displayBooks(myLibrary) {
    for (const book of myLibrary) {
        let div = document.createElement('div');
        div.classList.add('cards');
        div.dataset.id = book.id; // for deleting the correct book

        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let status = document.createElement('button');
        let removeBook = document.createElement('button');
        
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages + ' pages';
        status.textContent = book.status;
        status.dataset.status = book.status; // for changing the book status
        removeBook.textContent = 'Remove';

        div.append(title);
        div.append(author);
        div.append(pages);
        div.append(status);
        div.append(removeBook);

        container.appendChild(div);

        removeBook.addEventListener('click', () => {
            let bookToRemove = myLibrary.findIndex(book => div.dataset.id === book.id);
            myLibrary.splice(bookToRemove, 1);
            container.textContent = ''; // reset display before showing the updated array
            displayBooks(myLibrary);
        });

        status.addEventListener('click', () => {
            book.changeStatus();
            status.dataset.status = book.status;
            status.textContent = book.status;
        });
    }
}

// form reset
function clearForm() {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    readStatus.checked = false;
}

function storeFormInfo(title, author, pages, status) {
    title = titleInput.value;
    author = authorInput.value;
    pages = parseInt(pagesInput.value);
    status = readStatus.checked ? 'Read' : 'Not read';

    // doesn't add a book if any of these requiremnts aren't met
    if (title.trim().length === 0 || author.trim().length === 0 || pages < 10) {
        return;
    }

    addBookToLibrary(title, author, pages, status);
    container.textContent = '';
    displayBooks(myLibrary);
}

// where event listsners are stored
function eventListeners() {
    addBook.addEventListener('click',() => {
        dialog.showModal();
    });

    closeDialog.addEventListener('click', () => {
        dialog.close();
        clearForm();
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        storeFormInfo(titleInput, authorInput, pagesInput, readStatus);
        dialog.close();
        clearForm();
    });
}

addBookToLibrary('Domestic Girlfriend', 'Kei Sasuga', 276, 'Read'); // dummy data
displayBooks(myLibrary);
eventListeners();