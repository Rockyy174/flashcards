export function getFetchOptions(method, body) {
    return {
        method: method ? method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? body : null,
    }
}

export const updateStorageAuth = data => {
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
}

export const cleanStorageAuth = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}

