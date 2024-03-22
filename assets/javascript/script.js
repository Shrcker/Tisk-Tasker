const monthInput = document.getElementById("month-input");
const dayInput = document.getElementById("day-picker");
const eventTime = document.getElementById("event-time");
const submitButton = document.getElementById("submit-button");
const titleText = document.getElementById("title-text");
const descText = document.getElementById("desc-text");
const calendarBody = document.getElementById("calendar-body");
const myModal = document.getElementById("myModal");
const detailsPanel = document.getElementById("details-panel");
const saveData = JSON.parse(localStorage.getItem("saves")) ?? [];
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");

const saveDate = (e) => {
  e.preventDefault();

  const userData = {
    title: titleText.value,
    description: descText.value,
    date: dayInput.value,
    time: eventTime.value,
  };
  // Writes up the user object to store event details

  const data = { ...userData };
  saveData.push(data);
  localStorage.setItem("saves", JSON.stringify(saveData));
  myModal.style.display = "none";
  updateCalendar(); // Once an event is saved, highlight it on the calendar
};

const updateCalendar = () => {
  // Highlights days that have events tied to them.
  let dayList = document.querySelectorAll("li");
  let dayArray = Array.from(dayList); // Converts NodeList into an array.
  dayArray.splice(0, 7); // Cuts the weekday list items from this array.
  saveData.forEach((event) => {
    const foundDayEl = dayArray.find(
      (day) =>
        day.textContent === JSON.stringify(parseInt(event.date.split("-")[2]))
    );
    if (foundDayEl) {
      foundDayEl.classList.toggle("event-day");
    }
  });
};

// Array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Function to generate the calendar
const manipulate = () => {
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();
  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();
  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();
  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();
  // Variable to store the generated calendar HTML
  let lit = "";
  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }
  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // Check if the current date is today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }
  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive"}>${i - dayend + 1}</li>`;
  }
  // Update the text of the current date element
  // with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;
  // update the HTML of the dates element
  // with the generated calendar
  day.innerHTML = lit;
};
manipulate();
updateCalendar();
// Attach a click event listener to each icon
prenexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener("click", () => {
    // Check if the icon is "calendar-prev"
    // or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;
    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the
      // month with the new year
      date = new Date(year, month, new Date().getDate());
      // Set the year to the new year
      year = date.getFullYear();
      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }
    // Call the manipulate function to
    // update the calendar display
    manipulate();
  });
});

const selectDay = (e) => {
  e.stopPropagation();
  dayArray = document.querySelectorAll("li");
  dayArray.forEach((selected) => selected.classList.remove("active"));
  e.target.classList.toggle("active");

  let targetDay = e.target.innerHTML; // Selector to get the day of the month that the selected day is.
  let userDay = saveData.filter(
    (event) => JSON.stringify(parseInt(event.date.split("-")[2])) === targetDay
  ); // Finds and returns the object that matches the currently selected day.
  detailsPanel.innerHTML = "";
  if (userDay.length) {
    // If there are events matching the day, write their contents to the detail panel
    for (let i = 0; i < userDay.length; i++) {
      let HTMLText = `
        <h3 id="details-header">Here's what's going on today:</h3>
        <ul id="details-title"><strong>Event</strong>: ${userDay[i].title}</ul>
        <ul id="details-desc"><strong>Description:</strong> ${userDay[i].description}</ul>
        <ul id="details-time"><strong>Time:</strong> ${userDay[i].time}</ul>`;
      detailsPanel.innerHTML += HTMLText;
    }
  }
};

day.addEventListener("click", selectDay);
submitButton.addEventListener("click", saveDate);
