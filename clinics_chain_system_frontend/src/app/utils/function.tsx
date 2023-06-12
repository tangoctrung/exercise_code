import { TOKEN_FAKE } from "../constant";
import jwt_decode from "jwt-decode";

export const checkTokenLocalstorage = () => {
    let accessToken = localStorage.getItem("accessToken") || TOKEN_FAKE;
    let decoded:any = jwt_decode(accessToken);
    return decoded?.Email || "";
}