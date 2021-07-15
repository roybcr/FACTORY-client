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
  shiftElements
} from "../utils/elements.js";
import {
  useRedirect
} from "../utils/useRedirect.js";
import {
  generateBody
} from "../utils/generateBody.js";
const addShift = (uid) => {
  const shift = {
    date: shiftElements.date.value,
    startTime: shiftElements.start.value.split(":")[0],
    endTime: shiftElements.end.value.split(":")[0],
  };
  crud.endpoint = shiftsEndpoint + "/" + uid;
  crud.options = Object.assign(crud.options, generateBody(shift, "POST"));
  crud.post().then(() => {
    setTimeout(() => {
      useRedirect("shifts.html", {
        uid
      })
    }, 500);
  })
}
const initializeShiftForm = async () => {
  initializer();
  const auth = await isAuth();
  if (auth) {
    const [uid] = getParamsFromUrl(["uid"])
    shiftElements.addShiftBtn.onclick = () => addShift(uid)
  } else {
    useKickout();
  }
}
window.onload = initializeShiftForm();
