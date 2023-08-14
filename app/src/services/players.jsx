import axios from "axios";
const baseUrl = "/api/players";

// let token = null

// const setToken = newToken => {
//     token = `Bearer ${newToken}`
// }

const getAll = (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.get(baseUrl, config);
  return req.then((res) => res.data);
};

const getPlayer = (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const req = axios.get(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};

const create = async (newObject, haveFormData, formData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.post(baseUrl, newObject, config);
  req
    .then((res) => {
      const data = res.data
      const { id } = data

      if (haveFormData) { // Subimos la nueva imagen
        const config = {
          headers: {
            // Authorization: token,
            "Content-Type": "multipart/form-data"
          },
        };

        formData.append('id', id)

        const req_picture = axios.post(`${baseUrl}/player_picture`, formData, config);
        req_picture
          .then((res) => {
            const data  = res.data
            console.log('imagen subida... ', data);
          })
      }
    })

  return req.then((res) => res.data);
};

const update = (id, newObject, haveFormData, formData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  if (haveFormData) { // Subimos la nueva imagen
    const config = {
      headers: {
        // Authorization: token,
        "Content-Type": "multipart/form-data"
      },
    };  
    const req = axios.post(`${baseUrl}/player_picture`, formData, config);
  }

  const req = axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.then((res) => res.data);
};

export default { getAll, create, update, getPlayer };
