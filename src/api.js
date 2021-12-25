import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyA0I2223cfD2EWLebSKH8E6Ibo4fDEYIpM",
  },
});

export default request;
