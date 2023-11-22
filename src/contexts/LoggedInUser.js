
import { createContext } from "react";

const LoggedInUser = createContext({
    isUserLoggedin : false,
    liUserId: 0,
    liUserFullname : 'Guest User',
    liUserMno : '',
})

export default LoggedInUser;