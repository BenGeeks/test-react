import Axios from 'axios';

const apiRequest = (payload) => {
  let config = {
    method: payload.method,
    url: `http://localhost:8080/api/${payload.url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic 200dc6530975193d5ffeea3a5f524fab9d49f730b0caef83c775154b1678e040',
    },
    data: payload.data,
  };

  return Axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export default apiRequest;
