export function authFetch(url: string, options?: RequestInit) {
    const token = localStorage.getItem("access_token")
    let newOptions: RequestInit = {};
    if (options) {
        newOptions = { ...options }
    }
    if (token) {
        if (newOptions.headers) {
            newOptions.headers = {
                ...newOptions.headers,
                "Authorization": `Bearer ${token}`
            }
        } else {
            newOptions.headers = new Headers({"Authorization": `Bearer ${token}`})
        }
    }    

    return fetch(url, newOptions);
}