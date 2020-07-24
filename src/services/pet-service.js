import config from "../config";


const PetApiService = {
    getCat() {
        return fetch(`${config.API_ENDPOINT}/pets/cat`).then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json());
    },
    getDog() {
        return fetch(`${config.API_ENDPOINT}/pets/dog`).then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json());
    },
    getLine() {
        return fetch(`${config.API_ENDPOINT}/people`).then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json());
    },
    removeCat() {
        return fetch(`${config.API_ENDPOINT}/pets/cat`, {
            method: "DELETE"
        }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
    },
    removeDog() {
        return fetch(`${config.API_ENDPOINT}/pets/dog`, {
            method: "DELETE"
        }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
    }
}

export default PetApiService;