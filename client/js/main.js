import {
  homeElements
} from "./utils/elements.js";
import {
  getParamsFromUrl
} from "./utils/getParamsFromUrl.js";
import {
  useRedirect
} from "./utils/useRedirect.js";
import {
  initializer
} from "./utils/initializer.js";
const initializeHomepage = () => {
  initializer();
  const [uid] = getParamsFromUrl(["uid"]);
  homeElements.dep.onclick = () => {
    useRedirect("Departments/departments.html", {
      uid
    })
  }
  homeElements.emp.onclick = () => {
    useRedirect("Employees/employees.html", {
      uid
    })
  }
  homeElements.shft.onclick = () => {
    useRedirect("Shifts/shifts.html", {
      uid
    })
  }
}
window.onload = initializeHomepage()
