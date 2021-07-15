// params: string["uid", "employeeId"...]
// returns an array of values
export const getParamsFromUrl = (params) => {
  let urlParams = new URLSearchParams(window.location.search);
  const values = params.map((param) => {
    return urlParams.get(param);
  })
  return values;
};
