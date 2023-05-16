import axios from "axios";

const MailClient = axios.create({
  baseURL: "https://localhost:7222",
});
export default MailClient;
