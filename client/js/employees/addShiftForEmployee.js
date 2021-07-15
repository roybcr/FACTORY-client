import {
  initializer
} from "../utils/initializer.js";
import {
  crud
} from "../utils/crud.js";
import {
  isAuth
} from "../utils/isAuth.js"
import {
  useKickout
} from "../utils/useKickout.js";
import {
  getParamsFromUrl
} from "../utils/getParamsFromUrl.js";
import {
  employeesElements
} from "../utils/elements.js";
import {
  useRedirect
} from "../utils/useRedirect.js";
import {
  generateBody
} from "../utils/generateBody.js";
import {
  shiftsEndpoint
} from "../utils/endpoints.js";
const addShiftForEmployee = (uid, eid) => {
  const s = {
    date: employeesElements.date.value,
    starttime: employeesElements.start.value.split(":")[0],
    endttime: employeesElements.end.value.split(":")[0],
  };
  crud.endpoint = shiftsEndpoint + "/" + uid + "/" + eid;
  crud.options = Object.assign(crud.options, generateBody(s, "POST"));
  crud.post().then(() => {
    setTimeout(() => {
      useRedirect("employees.html", {
        uid
      })
    }, 5000);
  })
}
const initializeShiftForm = async () => {
  initializer();
  const auth = await isAuth();
  if (auth) {
    const [uid, eid] = getParamsFromUrl(["uid", "eid"])
    employeesElements.addShiftBtn.onclick = () => addShiftForEmployee(uid, eid)
  } else {
    useKickout();
  }
}
window.onload = initializeShiftForm();
