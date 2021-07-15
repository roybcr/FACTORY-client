export const useKickout = () => {
  sessionStorage.clear();
  window.history.replaceState({}, document.title, "/" + "pages/Login.html");
  window.location.reload();
}