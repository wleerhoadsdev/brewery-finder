export const catchErrors = (error) => {
    if (error.response) {
        // Request made and server responded
        alert(error.response.data.error + '\n' + error.response.data.message);
        console.error(error.message + ': ' + error.response.data.message);
        console.error(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        alert(error.request);
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error \n', error.message);
        console.log('Error', error.message);
    }
};
