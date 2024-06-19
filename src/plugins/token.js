
export default {
  data: {
    TOKEN_KEY: "vnpt_news_token",
  },
  setToken: function (token) {
    try {
        document.cookie = this.data.TOKEN_KEY+ "=" +  JSON.stringify(token);
        return true;
    } catch (error) {
        return false;
    }
  },
  getTokenFromStorage(){
    return JSON.parse(this.getCookie(this.data.TOKEN_KEY));
  },
  getAuthorization: function (){
    let tt = this.getTokenType();
    let tv = this.getToken();
    if(!(tt == null || tv == null)){
      return tt.charAt(0).toUpperCase() + tt.slice(1) + " " + tv;
    }
    return null;
  },
  getToken: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.access_token;
    } catch (error) {
      return null;
    }
  },
  getTokenType: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.token_type;
    } catch (error) {
      return null;
    }
  },
  getClaims: function () {
    try {
      var token = this.getToken();
      if (token !== null && token !== "") {
        return jwtdecode(token);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  getProperty: function (name) {
    var obj = this.getClaims();
    if (obj !== null) {
      return obj[name];
    } else {
      return null;
    }
  },
  getUserName: function () {
    try {
      var obj = this.getProperty("user_name");
      if (obj !== null) {
        return obj;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  getNguoiDungID: function () {
    try {
      var obj = this.getProperty("nguoidung_id");
      if (obj !== null) {
        return obj;
      } else {
        return -1;
      }
    } catch (error) {
      return -1;
    }
  },
  destroy: function(){
    try {
      localStorage.removeItem(this.data.TOKEN_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}