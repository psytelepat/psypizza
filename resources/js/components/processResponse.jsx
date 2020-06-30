export default (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return new Promise((resolve, reject) => {
            response.json()
            .then((json) => reject(json))
            .catch(() => reject(response.statusText));
        });
    }
}