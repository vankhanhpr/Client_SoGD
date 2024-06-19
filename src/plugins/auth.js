import token from "./token";
var AuthPlugin = {
  isAuthenticated: function(){
    return token.getTokenFromStorage() != null;
  },
  destroy: function () {
    token.destroy();
    localStorage.clear();
  },
  setToken: function (stringToken) {
    token.setToken(stringToken);
  },
  getToken: function () {
    return token.getToken();
  },
  getClaims: function () {
    return token.getClaims();
  },
  getProperty: function (name) {
    return token.getProperty(name);
  },
  getPhanVungID: function () {
    return token.getPhanVungID();
  },
  getUserName: function () {
    return token.getUserName();
  },
  getNguoiDungID: function () {
    return token.getNguoiDungID();
  },
};

export default function (Vue) {
  Vue.auth = AuthPlugin;
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function () {
        return Vue.auth;
      }
    }
  });
}
