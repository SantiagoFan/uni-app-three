import axios from "./axios";
console.log(axios);
export function httpPost(url, param) {
  return axios
    .post(url, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
export function httpGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
