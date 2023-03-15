import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import HomeListings from './components/Homelistings';
import Home from './components/Home';
const App = () => {
    return (_jsx("div", Object.assign({ className: "App" }, { children: _jsx("div", Object.assign({ className: "container" }, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", Component: Home }), _jsx(Route, { path: "/listings", Component: () => _jsx(HomeListings, { listingsHtml: 'https://www.corcoran.com/search/for-sale/location/northwest-harris-tx-17534130/regionId/119' }) })] }) })) })));
};
export default App;
