export const processResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return new Promise((resolve, reject) => {
            response.json()
            .then((json) => { reject({ message: json.message||"", json, response }) })
            .catch(() => { reject({ message: response.statusText, json: null, response }) });
        });
    }
}

export const processErrors = (json, setErrors) => {
    if (setErrors && json && json.errors) {
        for (var k in json.errors) {
            if (typeof json.errors[k] != 'string') {
                json.errors[k] = json.errors[k].join(' ');
            }
        }
        setErrors(json.errors);
    }
}

export default processResponse;