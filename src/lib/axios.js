import Axios from 'axios';

const apiRequest = (payload) => {
  let config = {
    method: payload.method,
    url: `https://www.bebengskitchen.com/api/${payload.url}`,
    headers: {
      'Content-Type': 'application/json',
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
