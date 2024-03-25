const numberUrl = "http://numbersapi.com/1337/trivia?notfound=floor&fragment";

const number = document.getElementById("number");

fetch(numberUrl)
    .then((response) => response.json());
    then((data) => (number.innerText = data));
