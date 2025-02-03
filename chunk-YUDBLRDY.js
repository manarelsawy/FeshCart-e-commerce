import{g as u}from"./chunk-6ZCYXRR4.js";import{s as l,x as s}from"./chunk-RR6JAF5F.js";import{W as p,aa as n}from"./chunk-FMPYM7VX.js";var i=class extends Error{};i.prototype.name="InvalidTokenError";function f(e){return decodeURIComponent(atob(e).replace(/(.)/g,(r,t)=>{let o=t.charCodeAt(0).toString(16).toUpperCase();return o.length<2&&(o="0"+o),"%"+o}))}function h(e){let r=e.replace(/-/g,"+").replace(/_/g,"/");switch(r.length%4){case 0:break;case 2:r+="==";break;case 3:r+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return f(r)}catch{return atob(r)}}function d(e,r){if(typeof e!="string")throw new i("Invalid token specified: must be a string");r||(r={});let t=r.header===!0?0:1,o=e.split(".")[t];if(typeof o!="string")throw new i(`Invalid token specified: missing part #${t+1}`);let c;try{c=h(o)}catch(a){throw new i(`Invalid token specified: invalid base64 for part #${t+1} (${a.message})`)}try{return JSON.parse(c)}catch(a){throw new i(`Invalid token specified: invalid json for part #${t+1} (${a.message})`)}}var I=(()=>{class e{constructor(){this._HttpClient=n(l),this._Router=n(u)}setRegisterForm(t){return this._HttpClient.post(`${s.baseURL}/api/v1/auth/signup`,t)}setLoginForm(t){return this._HttpClient.post(`${s.baseURL}/api/v1/auth/signin`,t)}saveUserData(){localStorage.getItem("userToken")!==null&&d(localStorage.getItem("userToken"))}logout(){localStorage.removeItem("userToken"),this.userData=null,this._Router.navigate(["/login"])}setEmailVerify(t){return this._HttpClient.post(`${s.baseURL}/api/v1/auth/forgotPasswords`,t)}setCodeVerify(t){return this._HttpClient.post(`${s.baseURL}/api/v1/auth/verifyResetCode`,t)}setResetPass(t){return this._HttpClient.put(`${s.baseURL}/api/v1/auth/resetPassword`,t)}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275prov=p({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{I as a};
