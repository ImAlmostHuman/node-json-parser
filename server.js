var express = require('express'),
bodyParser = require('body-parser');

var app = express();

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});


app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Server running, send Json this way!')
})

// handle post
app.post('/', function(req, res) {
    console.log(req.body); // your JSON

    var jsonData = req.body;

    //From the list of shows in the request payload, 
    //return the ones with DRM enabled (drm: true) 
    //and at least one episode (episodeCount > 0).  
    var result = jsonData.payload.filter(function(el) {
        return el.drm == true &&
            el.episodeCount >= 1;
    });

    //The returned JSON should have a response key 
    //with an array of shows. Each element should have 
    //the following fields from the request:
    //image - corresponding to image/showImage from the request payload
    //slug
    //title
    response = [];
    for (i = 0; i < result.length; i++) {

        response.push({
            image: result[i].image.showImage,
            slug: result[i].slug,
            title: result[i].title
        });
    }

    res.status(200).send(JSON.stringify({ response }));

});

// handle errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) return res.status(400).send(JSON.stringify({
        error: "Could not decode request: JSON parsing failed"
    }))

    console.error(err);
    res.status(500).send();
});

app.listen(3000, () => console.log("Running!"));