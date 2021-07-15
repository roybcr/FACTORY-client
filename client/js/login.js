import {
  loginElements
} from "./utils/elements.js"
import {
  loginEndpoint
} from "./utils/endpoints.js";
import {
  generateBody
} from "./utils/generateBody.js";
import {
  useRedirect
} from "./utils/useRedirect.js"
import {
  crud
} from "./utils/crud.js";
const highlightFieldError = (message) => {
  loginElements.error.innerText = message;
  loginElements.error.style.display = "flex";
  loginElements.usernameField.style.border = "2px solid crimson";
  loginElements.passwordField.style.border = "2px solid crimson";
  loginElements.usernameLabel.style.color = "crimson";
  loginElements.passwordLabel.style.color = "crimson";
}
const restoreDOM = () => {
  loginElements.usernameField.style.border = "2px solid #e9ecef";
  loginElements.passwordField.style.border = "2px solid #e9ecef";
  loginElements.usernameLabel.style.color = "#121212";
  loginElements.passwordLabel.style.color = "#121212";
  loginElements.error.style.display = "none";
  loginElements.passwordField.value = "";
}
loginElements.loginButton.onclick = () => {
  const user = {
    username: loginElements.usernameField.value,
    password: loginElements.passwordField.value
  }
  crud.endpoint = loginEndpoint;
  crud.options = Object.assign(crud.options, generateBody(user, "POST"));
  crud.post().then((x) => {
    if (!x) {
      return new Promise((resolve) => {
        setTimeout(() => {
          restoreDOM();
          resolve();
        }, 2000)
        highlightFieldError("Incorrect username or password.")
      });
    } else {
      sessionStorage.setItem("firstname", x["firstname"]);
      sessionStorage.setItem("lastname", x["lastname"]);
      setTimeout(() => {
        useRedirect("index.html", {
          uid: x.ID
        })
      }, 500);
    }
  })
}
