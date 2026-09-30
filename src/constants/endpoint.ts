export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    ME: "/me",
    LOGOUT: "/logout",
  },

  MASTER: {
    MENU: "/menus",
    PERMISSION: "/permissions",
    USER: "/users",
    ROLE: "/roles",
    DEPARTMENT: "/departments",
    CAREER: "/careers",
    SKILL: "/skills"
  }



} as const;