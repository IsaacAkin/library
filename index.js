const myLibrary = [];

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