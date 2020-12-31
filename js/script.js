// Get the UI elements

let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


// Book Class

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class
class UI {
    

    static addToBookList(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href = '#' class="delete">X</a></td>`;

        list.appendChild(row);// add the row into book-list

    }
    static clearFields(){
        // after add the value its empty the list
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";

    }
    static showAlert(message, className){
        let div = document.createElement('div'); // create a class to show between h3 and form
        div.className = `alert ${className}`; // class name .success and .error
        div.appendChild(document.createTextNode(message)); // pass to appendChild 
        let container = document.querySelector('.container'); // call the container
        let form = document.querySelector('#book-form');// call the call the list
        container.insertBefore(div, form); // insert the item 1st parameter is new child which is created and reference child
        
        setTimeout(()=>{
            document.querySelector('.alert').remove();

        }, 3000);// message and error alert class shows for 3s.
    }
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            UI.showAlert("Book Removed..!!!",'error');
            removeBooks(target.parentElement.previousElementSibling.textContent.trim())
        }
    }
}

//local Storage into class

class Store{

    static get_books(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book){
        let books = Store.get_books();
        books.push(book)
    
        localStorage.setItem('books',JSON.stringify(books));
    
    }
    
    static DisplayBook(){
        let books =  Store.get_books();
    
        books.forEach(book => {
            UI.addToBookList(book)
        });
    
    }
    static removeBooks(isbn){
        let books =  Store.get_books();
    
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
    
        localStorage.setItem('books',JSON.stringify(books));
    
    }
}

// add Event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.DisplayBook());
// define function 

function newBook(e){
    // data collect 
     let title = document.querySelector('#title').value,
     author = document.querySelector('#author').value,
     isbn = document.querySelector('#isbn').value;
    // let ui = new UI()

     if(title == '' || author === '' || isbn === ''){
        UI.showAlert("Please fill all the fields",'error');
     }else{
        let book = new Book(title, author, isbn);//pass through the object

    
        UI.addToBookList(book);
        UI.showAlert("Book is added",'success');
   
        UI.clearFields();
        Store.addBooks(book);
     }


    
    e.preventDefault();
}

function removeBook(e){
    //let ui = new UI();
    UI.deleteFromBook(e.target);
    
    e.preventDefault();
}

// store in local storage through function

// function get_books(){
//     let books;
//     if(localStorage.getItem('books') === null){
//         books = []
//     }else{
//         books = JSON.parse(localStorage.getItem('books'));
//     }
//     return books;
// }
// function addBooks(book){
//     let books = get_books();
//     books.push(book)

//     localStorage.setItem('books',JSON.stringify(books));

// }

// function get_task(){
//     let books = get_books();

//     books.forEach(book => {
//         UI.addToBookList(book)
//     });

// }
// function removeBooks(isbn){
//     let books =  get_books();

//     books.forEach((book, index) => {
//         if(book.isbn === isbn){
//             books.splice(index, 1);
//         }
//     });

//     localStorage.setItem('books',JSON.stringify(books));

// }