import {
  initializer
} from "../utils/initializer.js";
import {
  employeesEndpoint,
  departmentsEndpoint
} from "../utils/endpoints.js";
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
  globalElements,
  employeesElements
} from "../utils/elements.js";
import {
  useRedirect
} from "../utils/useRedirect.js";
import {
  generateBody
} from "../utils/generateBody.js";
const addEmployee = (uid) => {
  const emp = {
    firstname: employeesElements.first.value,
    lastname: employeesElements.last.value,
    departmentID: globalElements.list.value,
    start_work_year: employeesElements.swy.value,
  }
  crud.endpoint = employeesEndpoint + "/" + uid;
  crud.options = Object.assign(crud.options, generateBody(emp, "POST"));
  crud.post().then(() => {
    setTimeout(() => {
      useRedirect("employees.html", {
        uid
      })
    }, 500);
  })
}
const initializeDepList = async () => {
  initializer();
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    crud.endpoint = departmentsEndpoint + "/" + uid;
    crud.get().then((x) => {
      if (x) {
        for (let dep of x) {
          const option = new Option("ID:" + " " + dep.ID);
          option.setAttribute("value", dep.ID);
          globalElements.list.add(option, undefined);
        }
      }
    });
    employeesElements.addEmpBtn.onclick = () => addEmployee(uid)
  } else {
    useKickout();
  }
}
window.onload = initializeDepList();
