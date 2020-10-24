export function getRepLogs() {
    return fetch('/reps', {
        credentials: 'same-origin'
    }).then(response => {
            return response.json().then((data) => data.items)
    });
}
