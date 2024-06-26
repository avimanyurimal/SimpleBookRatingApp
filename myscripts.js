// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ9bmaVkWeVHY_zCCTi2KwWZIn4obo-10",
    authDomain: "cs022-2358196.firebaseapp.com",
    projectId: "cs022-2358196",
    storageBucket: "cs022-2358196.appspot.com",
    messagingSenderId: "215550901277",
    appId: "1:215550901277:web:01a6fd9579daf30cd11af4",
    measurementId: "G-EGBM5Q69KB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Query Firestore to get books
const q = query(collection(db, "book_review"), orderBy("book_name"));
const unsubscribe = onSnapshot(q, (snapshot) => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear previous data

    snapshot.forEach((doc) => {
        const book = doc.data();
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <div>Book Name: ${book.book_name}</div>
          <div>Book Author: ${book.book_author}</div>
          <div>Book Rating: ${book.book_rating}</div>
          <hr>
        `;
        bookList.appendChild(listItem);
    });
});

// Add data to Firestore
document.getElementById('btn').addEventListener('click', function() {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const rating = parseInt(document.getElementById('bookrating').value);
    addDoc(collection(db, "book_review"), { book_name: title, book_author: author, book_rating: rating });
});
