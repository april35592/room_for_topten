import CryptoJS from "crypto-js";

const decrypt = (string) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(string, "").toString(CryptoJS.enc.Utf8)
  );
};

export default decrypt;
