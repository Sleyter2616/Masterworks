import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const getListingResults = (node) => {
    const aNode = node.querySelector('.Card__link');
    const title = aNode.getAttribute('aria-label');
    const priceNode = node.querySelector('.Card__price');
    const price = priceNode.innerText.trim();
    const descNode = node.querySelector('.Card__address');
    const description = descNode.innerText.trim();
    const imgNode = node.querySelector('.Card__image img');
    const image = imgNode.src;
    return {
        title,
        price,
        description,
        image,
    };
};
const HomeListings = ({ listingsHtml }) => {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        const doc = new DOMParser().parseFromString(listingsHtml, 'text/html');
        const listingNodes = Array.from(doc.querySelectorAll('.Card')); // Update the selector to match the actual listing element
        const parsedListings = listingNodes.map((node) => getListingResults(node));
        setListings(parsedListings);
    }, [listingsHtml]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Home Listings" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Title" }), _jsx("th", { children: "Price" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Image" })] }) }), _jsx("tbody", { children: listings.map((listing, index) => (_jsxs("tr", { children: [_jsx("td", { children: listing.title }), _jsx("td", { children: listing.price }), _jsx("td", { children: listing.description }), _jsx("td", { children: _jsx("img", { src: listing.image, alt: "Home", height: "100" }) })] }, index))) })] })] }));
};
export default HomeListings;
