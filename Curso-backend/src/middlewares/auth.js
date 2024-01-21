import { authorizeAdmin, authorizeUser } from "../controller/authorization.controller.js";

export const usersOnly = authorizeUser;
export const adminsOnly = authorizeAdmin;