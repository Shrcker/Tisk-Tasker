var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2024-03-21&' +
          'sortBy=popularity&' +
          'apiKey=1b4fa9843cdc41449509023c6c6f76b5';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })