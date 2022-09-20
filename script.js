//Opening and closing the popup box */
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = document.querySelector("header i"),

//Title and description
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),

//Adding button
addBtn = popupBox.querySelector("button");

//month array
const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"]
//getting localstorage notes if they exist and parsing them to js object, else passing an empty arrat to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", () => {
 popupBox.classList.add("show");   
});

closeIcon.addEventListener("click", () => {
    //Make inputs empty when closing the box and opening again
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");   
});
//Showing the notes on the web
function showNotes() {
    //fixing duplicate notes
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note) => {
        let liTag = ` <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i class="ellipsis"></i>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}

addBtn.addEventListener("click", e => {
e.preventDefault();
let noteTitle = titleTag.value,
noteDesc = descTag.value;
if (noteTitle || noteDesc) {
    //getting month, day, year from the current date
    let dateObj = new Date(),
    month = months[dateObj.getMonth()],
    day = dateObj.getDate(),
    year = dateObj.getFullYear();

    let noteInfo = {
        title:noteTitle, description: noteDesc, date: `${month} ${day}, ${year}`
    }

    notes.push(noteInfo); //adding new notes to notes
    // saving notes to local storage and converting to strings
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    //function to show the notes
    showNotes();
}
})