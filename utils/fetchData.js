const baseUrl = process.env.BASE_URL;

export const postData = async (url, form) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(form),
  });

  const data = res.json();
  return data;
};
