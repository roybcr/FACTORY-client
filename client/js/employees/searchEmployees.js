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
  createTable
} from "../utils/createTable.js";
import {
  employeesElements
} from "../utils/elements.js";

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
export const searchResults = async () => {
  const filter = employeesElements.filter.value
  const input = employeesElements.input.value
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    initializer();
    crud.endpoint = employeesEndpoint + "/" + uid + "/" + filter + "/" + input;
    crud.get().then((x) => {
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
