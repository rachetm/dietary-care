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

export { handleError, checkIfAllergic };
