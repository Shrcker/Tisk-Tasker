// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle form submission
document
  .getElementById("eventForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var eventName = document.getElementById("eventName").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;

    // Do something with the form data (e.g., add event to planner)
    console.log("Event Name:", eventName);
    console.log("Event Date:", eventDate);
    console.log("Event Time:", eventTime);

    // Close the modal
    modal.style.display = "none";
  });
