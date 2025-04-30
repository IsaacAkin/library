const myLibrary = [];

const container = document.querySelector('.container');

function Book(title, author, pages, hadRead) {
    if (!new.target) {
        throw Error("You can only call this object with the 'new' operator");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hadRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
}

addBookToLibrary('Mushoku Tensei', 'Rifujin na Magonete', 20, true);
addBookToLibrary('Domestic na Kanojo', 'Kei Sasuga', 12, true);
addBookToLibrary('One Piece', 'Eiichiro Oda', 100, true);

function displayBooks(library) {
    library.forEach(book => {
        let div = document.createElement('div');

        let title = book.title;
        let author = book.author;
        let pages = book.pages;
        let hasRead = book.hasRead;

        div.append(title);
        div.append(author);
        div.append(pages);
        div.append(hasRead);

        container.appendChild(div);
    });
}

displayBooks(myLibrary);