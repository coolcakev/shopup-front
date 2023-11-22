import { jwtDecode } from "jwt-decode";
import { Session } from "./admin.slice";
const userTokenKey = "token";

export interface CreateAdminResponse {
  adminId: string;
  isSuccess: boolean;
  token: string;
}

export const getToken = (): Session => {
    const tokenString = sessionStorage.getItem(userTokenKey) ?? "";
    const session: Session = {
        id: '',
        token: tokenString
    }
    if (!tokenString) return session;

    const decoded = jwtDecode(tokenString);
    return {
        ...session,
        ...decoded
    };
};
export const saveToken = (token: string) => {
    sessionStorage.setItem(userTokenKey, token);
};
export const removeItem = async () => {
    sessionStorage.removeItem(userTokenKey);
};