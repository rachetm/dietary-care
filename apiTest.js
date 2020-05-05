/* eslint-disable import/no-unresolved */
const Request = require('request');

function getDetails() {
    return new Promise((resolve, reject) => {
        const product = 'nutella'; // this should be captured from the user's query

        Request.get(`https://dietary-care.herokuapp.com/${product}`, (err, res, body) => {
            if (err) {
                reject(err);
            }

            const data = JSON.parse(body);
            resolve(data);
        });
    });
}

getDetails().then((res) => {
    if (res.status === 200) {
        const { product: [{ ingredients }] } = res;

        const usersAllergies = ['nuts', 'milk', 'soy', 'hazelnut']; // this will come from SQL DB in array form

        const allergicTo = ingredients.filter((ele) => usersAllergies.includes(ele));

        if (allergicTo.length) {
            console.log('You cannot as it contains -> ', allergicTo.toString());
        } else {
            console.log('You can');
        }
    } else {
        console.log(res.message); // or 'res.message' can be given to .speak() directly
    }
});
