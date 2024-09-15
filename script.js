import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const appSettings = { 
    databaseURL: "https://vr-friends-404b2-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsInDB = ref(database, "comments")

const commentFieldEl = document.getElementById("comment-field")
const postButtonEl = document.getElementById("post-button")
const commentsEl = document.getElementById("comments")

postButtonEl.addEventListener("click", function() {
    let inputValue = commentFieldEl.value

    if (inputValue.length > 0) {
        push(commentsInDB, inputValue)

        clearCommentFieldEl()
    }

})

onValue(commentsInDB, function(snapshot) {

    if (snapshot.exists()) {

        let commentsArray = Object.entries(snapshot.val())

    clearCommentsEl()

    for (let i = 0; i < commentsArray.length; i++) {
        let currentComment = commentsArray[i]
        let currentCommentID = currentComment[0]
        let currentCommentValue = currentComment[1]

        appendCommentToCommentsEl(currentComment)

    }

    }   else {
            commentsEl.innerHTML = "No comments here ... yet"


    }
})

function clearCommentsEl() {
    commentsEl.innerHTML = null
}

function clearCommentFieldEl() {
    commentFieldEl.value = null
}

function appendCommentToCommentsEl(comment){

    let commentID = comment[0]
    let commentValue = comment[1]

    let newEl = document.createElement("li")

    newEl.textContent = commentValue

    newEl.addEventListener("dblclick", function() {

        let exactLocationOfCommentInDB = ref(database, `comments/${commentID}`)

        remove(exactLocationOfCommentInDB)

    })

    commentsEl.append(newEl)
}

