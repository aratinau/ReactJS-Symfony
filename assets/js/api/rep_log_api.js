function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(response => {
            // decode JSON, but avoid problems with empty responses
            return response.text()
                .then(text => text ? JSON.parse(text) : '')
        })
    ;
}

/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetchJson('/reps')
        .then(data => data.items)
    ;
}

export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE'
    });
}

export function createRepLog(repLog) {
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
