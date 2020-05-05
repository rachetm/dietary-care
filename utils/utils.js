const handleError = (res = {}, err = {}, msg = '', status = 500) => res.status(status).send({
    status,
    error: {
        display_message: msg,
        error: err,
    },
});

export { handleError };
