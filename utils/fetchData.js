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
