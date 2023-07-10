import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const ID_URL = 'https://api.thecatapi.com/images/search?breed_ids=${breedId}';
const API_KEY = "live_JaOlXJlO48Tx22GcLwU6QFTxcGFnpbz6ZGW91WktPPrUZzvLPQCkjepWjBWW5wvZ";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
        return axios.get(BASE_URL)
          .then(res => {
            return res.data;
          })
          .catch(error => {
            console.error("Error fetching breeds:", error);
            return [];
          });
      }

export function fetchCatByBreed(breedId) {
  return fetch(`${ID_URL}&api_key=${API_KEY}`)
  .then(resp => {
    if (!resp.ok) throw new Error(resp.status);
    return resp.json();
  })
  .catch(error  => console.error("Error fetching cat:", error));
}

  // return axios.get(ID_URL)
  //   .then(res => {
  //     return res.data[0];
  //   })
  //   .catch(error => {
  //     console.error("Error fetching cat:", error);
  //     // return null;
  //   });}
    console.log(fetchCatByBreed())