const handleError = (res = {}, err = {}, msg = '', status = 500) => res.status(status).send({
    status,
    error: {
        display_message: msg,
        error: err,
    },
});

const checkIfAllergic = (products, userAllergens) => {
    const { ingredients, allergens, category } = products[0];

    const allergiesList = new RegExp(userAllergens.toLowerCase().replace(',', '|'), 'ig');

    const checkIngredients = ingredients.match(allergiesList);
    const checkAllergens = allergens.match(allergiesList);

    let allergicTo = '';

    if (checkIngredients || checkAllergens) {
        if (checkIngredients != null) allergicTo = checkIngredients.join();
        else allergicTo = checkAllergens.join();

        return { isAllergic: 1, allergicTo, category };
    }

    return { isAllergic: 0 };
};

function titleCase(string) {
    const sentence = string.split(' ');
    for (let i = 0; i < sentence.length; i += 1) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
}

const convertToUpperCase = (products) => {
    const newProducts = products.map((product) => {
        const {
            product_name: productName, brand_name: brandName, link, img,
        } = product;
        const newProduct = {
            // ...product,
            link,
            img,
            product_name: titleCase(productName),
            brand_name: titleCase(brandName),
        };
        return newProduct;
    });
    return newProducts;
};

export { handleError, checkIfAllergic, convertToUpperCase };
