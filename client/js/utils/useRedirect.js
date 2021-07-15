export const useRedirect = (path, options) => {
  const keys = Object.keys(options).map((key) => {
    return key
  })
  let params = "";
  keys.forEach((key, i) => {
    i === 0 ? params += `?${key}=` + options[key] : params += `&${key}=` + options[key]
  })
  window.location.href = path + params;
}
