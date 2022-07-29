import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const push = (location) => history.push(location);
export const back = () => history.go(-2);
export const forward = () => history.forward();
