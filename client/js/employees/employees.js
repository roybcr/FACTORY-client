import {
  initializer
} from "../utils/initializer.js";
import {
  employeesEndpoint
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
  createTable,
  reloadTable
} from "../utils/createTable.js";
import {
  useRedirect
} from "../utils/useRedirect.js";
import {
  employeesElements
} from "../utils/elements.js";
const searchEmployees = (uid) => {
  const filter = employeesElements.filter.value;
  const input = employeesElements.input.value;
  console.log(filter, input)
  crud.endpoint = employeesEndpoint + "/" + uid + "/" + filter + "/" + input;
  crud.get().then((x) => {
    console.log(x)
    const cells = ["ID", "firstname", "lastname", "start_work_year", "isManager", "departmentName", "isManager",
      "shifts", "departmentID"
    ];
    const data = processDataBeforeInsert(x, uid)
    reloadTable(uid, cells, data);
  });
}

function processDataBeforeInsert(data, uid) {
  let result = [];
  Object.keys(data).forEach((key) => {
    let x = data[key];
    x.links = [{
        text: "Edit",
        href: "EditEmployee.html?uid=" + uid + "&" + "eid=" + x.ID,
      },
      {
        text: "Delete",
        atrribute: "onclick",
        action: "deleteEmployee(" + uid + x.ID + ")"
      },
      {
        text: "Add Shift",
        href: "AddShiftForEmployee.html?uid=" + uid + "&" + "eid=" + x.ID,
      }
    ]
    result.push(x)
  })
  return result;
}
const initializeEmployees = async () => {
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    employeesElements.addEmployee.addEventListener("click", () => useRedirect("AddEmployee.html", {
      uid
    }))
    employeesElements.search.addEventListener("click", () => searchEmployees(uid))
    initializer();
    crud.endpoint = employeesEndpoint + "/" + uid;
    crud.get().then((x) => {
      console.log(x)
      const cells = ["ID", "firstname", "lastname", "start_work_year", "isManager", "departmentName",
        "isManager", "shifts", "departmentID"
      ];
      const data = processDataBeforeInsert(x, uid)
      createTable(uid, cells, data);
    });
  } else {
    useKickout();
  }
}
window.onload = initializeEmployees();
