// include file system module
var fs = require('fs');

// read file sample.json file
fs.readFile('sample_request.json',
    // callback function that is called when reading file is done
    function(err, data) {
        // json data
        var jsonData = data;

        // parse json
        var jsonParsed = JSON.parse(jsonData);

        //From the list of shows in the request payload, 
        //return the ones with DRM enabled (drm: true) 
        //and at least one episode (episodeCount > 0).
        var result = jsonParsed.payload.filter(function(el) {
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

        console.log(response);

    });