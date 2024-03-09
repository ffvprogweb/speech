import axios from "axios";
const url = "localhost:8080/sendJson";
export const consultaChat = (produto) => axios.post(url, produto);
