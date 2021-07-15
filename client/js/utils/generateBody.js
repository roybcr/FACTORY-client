export const generateBody = (body, method) => {
  return body ? {
    body: JSON.stringify(body),
    method: method
  } : {
    method: method
  }
};
