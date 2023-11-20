class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }


    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject
    }

    getInfo() {
        return fetch(`${this._url}/users/me`,
            {
                headers: {
                    authorization: this._authorization
                }

            })
            .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job,
            })
        })
            .then(this._checkResponse);
    }

    setNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar,

                })
            })
            .then(this._checkResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.title,
                    link: data.link,

                })
            })
            .then(this._checkResponse);
    }

    // addLike(cardId) {
    //     return fetch(`${this._url}/cards/${cardId}/likes `,
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 authorization: this._authorization
    //             }
    //         })
    //         .then(this._checkResponse);
    // }

    // deleteLike(cardId) {
    //     return fetch(`${this._url}/cards/${cardId}/likes `,
    //         {
    //             method: 'DELETE',
    //             headers: {
    //                 authorization: this._authorization
    //             }
    //         })
    //         .then(this._checkResponse);
    // }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: this._authorization
                }
            })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes `, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
    headers: {
        authorization: '0763629c-3490-40e1-9aae-c13c00296c11',
        'Content-Type': 'application/json'
    }
});

export default api;
