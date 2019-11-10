const GetJokeHandler1 = {
    canHandle(handlerInput) {
     //const request = handlerInput.requestEnvelope.request;
      //return request.type === 'IntentRequest'
        //&& request.intent.name === 'GetJokeIntent';
          const request = handlerInput.requestEnvelope.request;
          return request.type === 'LaunchRequest'
        ||  (request.type === 'IntentRequest'
          && request.intent.name === 'GetJokeHandler')
      
       
    },
    
    var Request = require('request');

    async handle(handlerInput) {
      const response = await getDetails(); 
      
        if(res.status === 200)
        {

        }
        else
        {
            res.message
        }

    //   console.log(response);
  
    //   return handlerInput.responseBuilder
    //           .speak("Okay. Here is what I got back from my request, for you anurag " + response.value.joke)
    //           .reprompt("What would you like?")
    //           .getResponse();
    },
  };

  
  
  function getDetails() {
    return new Promise(((resolve, reject) => {
    //   var options = {
    //       host: 'https://dietary-care.herokuapp.com/',
    //       port: 22436,
    //       path: '/jokes/random',
    //       method: 'GET',
    //   };
      
    //   const request = https.request(options, (response) => {
    //     response.setEncoding('utf8');
    //     let returnData = '';
  
    //     response.on('data', (chunk) => {
    //       returnData += chunk;
    //     });
  
    //     response.on('end', () => {
    //       resolve(JSON.parse(returnData));
    //     });
  
    //     response.on('error', (error) => {
    //       reject(error);
    //     });
    //   });
    //   request.end();

    const product = nutella; //this should be captured from the user's query

    Request.get(`https://dietary-care.herokuapp.com/${product}`, function(err, res, body)
    {
        if(err)
        {
            reject(error);
        }

        const data = JSON.parse(body);
        resolve(data);
    });
    }));
  }