const apiUrl = "/api/chore";

export const getChores = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getChoreById = (id) => {
    return fetch(`${apiUrl}/${id}`).then((res) => res.json());
  };