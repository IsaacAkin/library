const myLibrary = [];

const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('.close-dialog');
const newBook = document.querySelector('.new-book');
const submitBtn = document.querySelector('.submit-btn');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatus = document.querySelector('#status');

function Book(title, author, pages, status) {
    if (!new.target) {
        throw Error("You can only call this object with the 'new' operator");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

addBookToLibrary('Mushoku Tensei', 'Rifujin na Magonete', 20, 'Read');
addBookToLibrary('Domestic na Kanojo', 'Kei Sasuga', 12, 'Read');
addBookToLibrary('One Piece', 'Eiichiro Oda', 100, 'Read');

function displayBooks(myLibrary) {
    for (const book of myLibrary) {
        let div = document.createElement('div');
        div.classList.add('cards');
        div.dataset.id = book.id;

        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let status = document.createElement('p');
        let removeBook = document.createElement('button');

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        status.textContent = book.status;
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
            container.textContent = '';
            displayBooks(myLibrary);
        });
    }
}

function clearForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatus.checked = false;
}

function storeFormInfo(title, author, pages, status) {
    if (title === '' || author === '' || pages === '') {
        return;
    }

    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    status = readStatus.checked ? 'Read' : 'Not read';

    addBookToLibrary(title, author, pages, status);
    container.textContent = '';
    displayBooks(myLibrary);
}

function eventListeners() {
    newBook.addEventListener('click',() => {
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

displayBooks(myLibrary);
eventListeners();