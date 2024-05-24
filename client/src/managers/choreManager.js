const apiUrl = "/api/chore";

export const getChores = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getChoreById = (id) => {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};

export const createChore = (chore) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chore),
  }).then((res) => res.json())
  
  
};

export const choreCompleted = (choreId, userId) => {
  return fetch(`${apiUrl}/${choreId}/complete?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {choreId, userId} ),
  });
};

export const assignChore = (choreId, userId) => {
  return fetch(`${apiUrl}/${choreId}/assign?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {choreId, userId} ),
  });
};

export const unassignChore = (choreId, userId) => {
  return fetch(`${apiUrl}/${choreId}/unassign?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateChore = (chore) => {
  return fetch(`${apiUrl}/${chore.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( chore ),
  })
};


