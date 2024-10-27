import { myAxios } from "./Helper";

export const signUp = (user) => {

    return myAxios.post("/api/auth/register",user).then
    ((response) => response.data)

}

