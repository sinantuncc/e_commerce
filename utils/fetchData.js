const baseUrl = process.env.BASE_URL;

export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "GET",
  });

  const data = res.json();
  return data;
};

export const postData = async (url, form, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "POST",
    body: JSON.stringify(form),
  });

  const data = res.json();
  return data;
};

export const putData = async (url, form, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "PUT",
    body: JSON.stringify(form),
  });

  const data = res.json();
  return data;
};

export const patchData = async (url, form, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "PATCH",
    body: JSON.stringify(form),
  });

  const data = res.json();
  return data;
};

export const delData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "DELETE",
  });

  return { success: true, message: "Delete success!" };
};
