import {
  initializer
} from "../utils/initializer.js";
import {
  shiftsEndpoint
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
  useRedirect
} from "../utils/useRedirect.js";
import {
  shiftElements
} from "../utils/elements.js";
const initializeShifts = async () => {
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    shiftElements.addShift.addEventListener("click", () => useRedirect("AddShift.html", {
      uid
    }))
    initializer();
    crud.endpoint = shiftsEndpoint + "/" + uid;
    crud.get().then((x) => {
      const cells = ["ID", "time", "date", "employees"]
      createTable(uid, cells, x);
    });
  } else {
    useKickout();
  }
}
window.onload = initializeShifts();
