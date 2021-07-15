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
const editEmployee = (uid) => {
  const [eid] = getParamsFromUrl(["eid"]);
  if (!eid) useRedirect("employees.html", {
    uid
  })
  const emp = {
    firstname: employeesElements.first.value,
    lastname: employeesElements.last.value,
    departmentID: globalElements.list.value,
    start_work_year: employeesElements.swy.value,
  }
  crud.endpoint = employeesEndpoint + "/" + uid + "/" + eid;
  crud.options = Object.assign(crud.options, generateBody(emp, "PUT"));
  crud.put().then(() => {
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
    initializeEmployee();
    employeesElements.saveEmployee.onclick = () => editEmployee(uid)
  } else {
    useKickout();
  }
}
const initializeEmployee = async () => {
  initializer();
  const auth = await isAuth();
  if (auth) {
    const [uid, eid] = getParamsFromUrl(["uid", "eid"])
    crud.endpoint = employeesEndpoint + "/" + uid + "/" + eid
    crud.get().then((x) => {
      if (x) {
        employeesElements.first.value = x.firstname;
        employeesElements.last.value = x.lastname;
        employeesElements.swy.value = x.start_work_year;
        globalElements.list.value = x.departmentID;
      }
    });
  } else {
    useKickout();
  }
}
window.onload = initializeDepList();
