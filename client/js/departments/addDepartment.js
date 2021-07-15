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
  departElements
} from "../utils/elements.js";
import {
  useRedirect
} from "../utils/useRedirect.js";
import {
  generateBody
} from "../utils/generateBody.js";
const addDepartment = (uid) => {
  const dep = {
    name: departElements.departmentName.value,
    manager_id: globalElements.list.value,
  }
  crud.endpoint = departmentsEndpoint + "/" + uid;
  crud.options = Object.assign(crud.options, generateBody(dep, "POST"));
  crud.post().then(() => {
    setTimeout(() => {
      useRedirect("departments.html", {
        uid
      })
    }, 500);
  })
}
const initializeEmployeeList = async () => {
  initializer();
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    crud.endpoint = employeesEndpoint + "/" + uid;
    crud.get().then((x) => {
      if (x) {
        for (let emp of x) {
          const option = new Option("ID:" + " " + emp.ID);
          option.setAttribute("value", emp.ID);
          globalElements.list.add(option, undefined);
        }
      }
    });
    departElements.addDepartment.onclick = () => addDepartment(uid)
  } else {
    useKickout();
  }
}
window.onload = initializeEmployeeList();
