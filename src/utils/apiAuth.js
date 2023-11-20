

const optionsApiAuth = {
    baseUrl: `https://auth.nomoreparties.co`,
    headers: {
        'Content-Type': 'application/json',
    }
}


class apiAuth {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }

    signup({ email, password }) {
        return this._apiAuthRequest(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    signin({ email, password }) {
        return this._apiAuthRequest(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    async _apiAuthRequest(url, options) {
        const res = await fetch(url, options);
        return this.checkResponse(res);
    }

    checkToken(token) {
        return this._apiAuthRequest(`${this.baseUrl}/users/me`, {
            headers: { ...this.headers, Authorization: `Bearer ${token}` },
        });
    }


}
const authApi = new apiAuth(optionsApiAuth);

export default authApi;