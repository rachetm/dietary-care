    var Request = require('request');

      const res = getDetails(); 
      
        if(res.status === 200)
        {
            const ingredients = res.product[0].ingredients;
            
            let flag = false;

            const usersAllergy = ['nuts', 'milk']; //this will come from SQL DB in array form

            ingredients.forEach(e_1 => {
                usersAllergy.forEach(e_2 => {
                    if(e_1 == e_2)
                    {
                        flag = true;
                        // break;
                    }
                });
            });

            if(flag)

                // .speak("You cannot have this product"); //tell user that he can or cannot have the product

        }
        else
        {
            console.log(res.message); //or 'res.message' can be given to .speak() directly
        }
  
  
  function getDetails() {
    return new Promise(((resolve, reject) => {
   
    const product = "nutella"; //this should be captured from the user's query

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