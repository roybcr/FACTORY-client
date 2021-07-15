import {
  globalElements,
} from "./elements.js";
import {
  useKickout
} from "./useKickout.js";
export const initializer = () => {
  const fullName = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
  if (fullName === null + " " + null) {
    useKickout();
  }
  globalElements.logout.onclick = () => useKickout();
  globalElements.nameDisplay.innerText = fullName;
};
