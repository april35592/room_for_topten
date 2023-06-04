import CryptoJS from "crypto-js";

const encrypt = (arr) => {
  return CryptoJS.AES.encrypt(JSON.stringify(arr), "").toString();
};

export default encrypt;
