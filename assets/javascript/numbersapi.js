$.get('http://numbersapi.com/1337/trivia?notfound=floor&fragment', function(data) {
    $('#number').text(data);
});
