// book class: Represent a Book
class Book {
      constructor(BookName,author,price){
        this.BookName = BookName;
        this.author = author;
        this.price = price;

      }
}
// UI Class: Handle UI Tasks
class UI {
    static displayBook(){
     
    
  const books = Store.getBooks();
  
  books.forEach((book) => UI.addBookToList(book));
}
  static addBookToList(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.BookName}</td>
    <td>${book.author}</td>
    <td>${book.price}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
     `;

     list.appendChild(row);
  }
  static deleteBook(el){
     if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
     }
  }
  
  static showAlert(message, className){
     const div = document.createElement('div');
     div.className = `alert alert-${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('.container');
     const form = document.querySelector('#book-form')
     container.insertBefore( div ,form );
    // vanish in 3s
       setTimeout(() => document.querySelector('.alert').remove(),3000 );
       }
  static clearFields(){
    document.querySelector('#BookName').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#price').value = '';

  }
}
// Store Class: Handle storage
class Store {
 static getBooks(){
    let books;
    if(localStorage.getItem('books')=== null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book){
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }
  static removeBook(price){

    const books = Store.getBooks();


    books.forEach((book,index) =>{
      if(book.price === price){
        books.splice(index,1);
      }

    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook)

// Event: Add a Book 
document.querySelector('#book-form').addEventListener('submit', (e) =>{
  e.preventDefault();
  const BookName = document.querySelector('#BookName').value;
  const author = document.querySelector('#author').value;
  const price = document.querySelector('#price').value;

 // validate
 if(BookName === '' || author === '' || price === ''){
   UI.showAlert('Please fill in all Fields','danger' );
 }else{

//instatiate book
const book = new Book(BookName,author,price);
// console.log(book)

// Add Book to UI
UI.addBookToList(book);
 
// Add Book to store
Store.addBook(book);


//  show succes message
  UI.showAlert('Book Added','info');

// Clear: Fields
UI.clearFields();
 }
});
// Event: Remove a BOok
document.querySelector('#book-list').addEventListener('click',(e)=>
{
  UI.deleteBook(e.target)

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


  //  show succes message
  UI.showAlert('Book Removed','info');
});



