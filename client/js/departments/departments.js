import {
  initializer
} from "../utils/initializer.js";
import {
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
  createTable
} from "../utils/createTable.js";
import {
  departElements
} from "../utils/elements.js";
import {
  useRedirect
} from "../utils/useRedirect.js";

function processDataBeforeInsert(data, uid) {
  let result = [];
  Object.keys(data).forEach((key) => {
    let x = data[key];
    if (x.hasEmployees) {
      x.links = [{
        text: "Edit",
        href: "EditDepartment.html?uid=" + uid + "&" + "did=" + x.ID,
      }]
    } else {
      x.links = [{
          text: "Edit",
          href: "EditDepartment.html?uid=" + uid + "&" + "did=" + x.ID,
        },
        {
          text: "Delete",
          atrribute: "onclick",
          action: "deleteDepartment(" + uid + x.ID + ")"
        }
      ]
    }
    result.push(x)
  })
  return result;
}
const initializeDepartments = async () => {
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    departElements.addDepButton.addEventListener("click", () => useRedirect("AddDepartment.html", {
      uid
    }))
    initializer();
    crud.endpoint = departmentsEndpoint + "/" + uid;
    crud.get().then((x) => {
      const cells = ["ID", "name", "manager_id"];
      const data = processDataBeforeInsert(x, uid)
      createTable(uid, cells, data);
    });
  } else {
    useKickout();
  }
}
window.onload = initializeDepartments();
