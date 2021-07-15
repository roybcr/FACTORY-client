import {
  employeesElements,
  globalElements
} from "./elements.js";
import {
  crud
} from "./crud.js";
import {
  departmentsEndpoint,
  employeesEndpoint
} from "./endpoints.js";
import {
  isAuth
} from "./isAuth.js";
import {
  generateBody
} from "./generateBody.js";
import {
  useKickout
} from "./useKickout.js";
export const createTable = (uid, cells, data, element = null) => {
  for (let x of data) {
    const newRow = element ? element.insertRow() : globalElements.tBody.insertRow();
    console.log(x);
    cells.includes("ID") ? newRow.insertCell().innerText = x.ID : null;
    cells.includes("firstname") ? newRow.insertCell().innerText = x.firstname : null;
    cells.includes("lastname") ? newRow.insertCell().innerText = x.lastname : null;
    cells.includes("name") ? newRow.insertCell().innerText = x.name : null;
    cells.includes("start_work_year") ? newRow.insertCell().innerText = x.start_work_year : null;
    cells.includes("departmentName") ? newRow.insertCell().innerText = x.departmentName : null;
    cells.includes("departmentID") ? newRow.insertCell().innerText = x.departmentID : null;
    cells.includes("manager_id") ? newRow.insertCell().innerText = x.manager_id : null;
    cells.includes("shiftId") ? newRow.insertCell().innerText = x.shiftId : null;
    cells.includes("employeeId") ? newRow.insertCell().innerText = x.employeeId : null;
    cells.includes("date") ? newRow.insertCell().innerText = new Date(x.date).toLocaleDateString() : null;
    cells.includes("time") ? newRow.insertCell().innerText =
      x.starttime + ":00" + "-" + x.endtime + ":00" : null;
    cells.includes("isManager") ? newRow.insertCell().innerText = x.isManager : null;
    const shifts = cells.includes("shifts") ? newRow.insertCell() : null;
    const employees = cells.includes("employees") ? newRow.insertCell() : null;
    if (shifts) {
      const ol = document.createElement("ol");
      ol.style.fontSize = "14px";
      ol.style.fontWeight = 600;
      ol.style.whiteSpace = "nowrap";
      ol.style.listStyle = "none";
      shifts.appendChild(ol);
      for (let eXs of x.employeesWithShifts) {
        const newShift = document.createElement("li");
        const dates = document.createElement("span");
        const times = document.createElement("span");
        dates.innerText = "Date: " + new Date(eXs.date).toLocaleDateString();
        times.innerText = " Time: " + eXs.starttime + ":00" + " - " + eXs.endtime + ":00";
        const br = document.createElement("br");
        newShift.appendChild(dates);
        newShift.appendChild(br);
        newShift.appendChild(times);
        ol.append(newShift);
        ol.append(br);
      }
    }
    if (employees) {
      const ol = document.createElement("ol");
      ol.style.fontSize = "14px";
      ol.style.fontWeight = 600;
      ol.style.whiteSpace = "nowrap";
      ol.style.listStyle = "none";
      employees.appendChild(ol);
      for (let e of x.employees) {
        const newEmp = document.createElement("li");
        const empLink = document.createElement("a");
        empLink.setAttribute(
          "href",
          "../../pages/employees/EditEmployee.html?uid=" + uid + "&" + "eid=" + e.ID,
        );
        empLink.innerText = e.firstname + " " + e.lastname;
        empLink.style.textDecoration = "none";
        empLink.style.color = "black";
        newEmp.appendChild(empLink);
        ol.appendChild(newEmp);
      }
    }
    if (x.links && x.links.length > 0) {
      for (let link of x.links) {
        const c = newRow.insertCell();
        if (link.action) {
          const newButton = document.createElement("button");
          if (link.atrribute === "onclick") {
            if (link.action.includes("deleteDepartment")) {
              newButton.addEventListener("click", () => {
                deleteDepartment(uid, x.ID)
              })
            } else if (link.action.includes("deleteEmployee")) {
              newButton.addEventListener("click", () => {
                deleteEmployee(uid, x.ID)
              })
            }
          }
          c.appendChild(newButton)
        } else {
          const newLink = document.createElement("a");
          newLink.setAttribute("href", link.href);
          newLink.style.textDecoration = "none";
          newLink.style.color = "black";
          newLink.innerText = link.text;
          c.appendChild(newLink);
        }
      }
    }
  }
}
const deleteDepartment = async (uid, did) => {
  const auth = await isAuth();
  if (auth) {
    crud.endpoint = departmentsEndpoint + "/" + uid + "/" + did;
    crud.options = Object.assign(crud.options, generateBody(null, "DELETE"));
    crud.delete().then(() => {
      window.location.reload();
    });
  } else {
    useKickout();
  }
}
const deleteEmployee = async (uid, eid) => {
  const auth = await isAuth();
  if (auth) {
    crud.endpoint = employeesEndpoint + "/" + uid + "/" + eid;
    crud.options = Object.assign(crud.options, generateBody(null, "DELETE"));
    crud.delete().then(() => {
      window.location.reload();
    });
  } else {
    useKickout();
  }
}
export const reloadTable = (uid, cells, data) => {
  const employeesTable = employeesElements.employeesTable;
  const tBody = globalElements.tBody;
  employeesTable.removeChild(tBody);
  const newBody = document.createElement("tBody");
  employeesTable.appendChild(newBody);
  createTable(uid, cells, data, newBody);
}
