var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

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

    var response = JSON.stringify({ response });



    res.send(response); // echo the result back
});

app.listen(3000); // your JSON