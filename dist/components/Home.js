import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Home = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Welcome to the Home Page" }), _jsx("p", { children: "Click the link below to view the home listings:" }), _jsx(Link, Object.assign({ to: "/listings" }, { children: "View Home Listings" }))] }));
};
export default Home;
