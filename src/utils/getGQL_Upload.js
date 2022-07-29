import { backendURL } from "./constants";

export const getGQL_Upload = ({formData, fetchPart}) => fetch(`${backendURL}/${fetchPart}`, {
    method: 'POST',
    headers: {
      ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
        : {}),
    },
    body: formData,
  }).then((response) => response.json());
