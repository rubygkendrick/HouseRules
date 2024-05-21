const apiUrl = "/api/userProfile";

export const getUserProfiles = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getUserById = (id) => {
    return fetch(`${apiUrl}/${id}`).then((res) => res.json());
  };