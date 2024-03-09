import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

const isBusiness = [{ to: ROUTES.MYCARDS, children: "My Cards" }];
const isAdmin = [
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.SANDBOX, children: "Sandbox" },
];

const UserLinks = ({ isBusiness, isAdmin }) => {
  if (isBusiness && isAdmin) {
    return isAdmin;
  } else {
    return isBusiness;
  }
};

export { myLinks, alwaysLinks, loggedOutLinks, isBusiness, isAdmin, UserLinks };
