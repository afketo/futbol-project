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

// const create = async (newObject, haveFormData, formData, token) => {
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };

//   const req = axios.post(baseUrl, newObject, config);
//   req
//     .then((res) => {
//       const data = res.data
//       const { id } = data

//       if (haveFormData) { // Subimos la nueva imagen
//         const config = {
//           headers: {
//             // Authorization: token,
//             "Content-Type": "multipart/form-data"
//           },
//         };

//         formData.append('id', id)

//         const req_picture = axios.post(`${baseUrl}/player_picture`, formData, config);
//         req_picture
//           .then((res) => {
//             const data  = res.data
//             console.log('imagen subida... ', data);
          
//             return req_picture.then((res) => res.data);
//           })
//       }
//     })

//   // return req.then((res) => res.data);
// };

const create = async (newObject, haveFormData, formData, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    // Primero creamos el jugador
    const req = await axios.post(baseUrl, newObject, config)
    console.log('1--lanzamos post ', req);

    const { id } = req.data

    if (haveFormData) {
      try {
        // Si ha añadido foto, la subimos y hacemos return del body con el picture
        const config = {
          headers: {
            // Authorization: token,
            "Content-Type": "multipart/form-data"
          },
        };
  
        formData.append('id', id)
  
        const req_picture = await axios.post(`${baseUrl}/player_picture`, formData, config)
        console.log('2--lanzamos picture ', req_picture);

        return req_picture.data
      }
      catch(err) {
        console.log('2--error picture ', err);
      }
    }
    return req.data
  }
  catch(err) {
    console.log('1--error ', err);
  }
}

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

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const req = await axios.delete(`${baseUrl}/${id}`, config)
    return req.status
  }
  catch(err) {
    console.log('error en borrado: ', err);
  }
}

export default { getAll, create, update, getPlayer, remove };
