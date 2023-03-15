import React, { useEffect, useState } from "react";
import parse, { domToReact } from 'html-react-parser';

const getListingResults = (node: HTMLElement): Listing => {
  const aNode = node.querySelector('.Card__link') as HTMLAnchorElement;
  const title = aNode.getAttribute('aria-label') as string;
  const priceNode = node.querySelector('.Card__price') as HTMLElement;
  const price = priceNode.innerText.trim();
  const descNode = node.querySelector('.Card__address') as HTMLElement;
  const description = descNode.innerText.trim();
  const imgNode = node.querySelector('.Card__image img') as HTMLImageElement;
  const image = imgNode.src;

  return {
    title,
    price,
    description,
    image,
  };
};

interface Listing {
  title: string;
  price: string;
  description: string;
  image: string;
}

interface Props {
  listingsHtml: string;
}

const HomeListings = ({ listingsHtml }: Props) => {
  const [listings, setListings] = useState<Listing[]>([]);
  
  useEffect(() => {
    const doc = new DOMParser().parseFromString(listingsHtml, 'text/html');
    const listingNodes = Array.from(doc.querySelectorAll('.Card')); // Update the selector to match the actual listing element
    const parsedListings = listingNodes.map((node) => getListingResults(node as HTMLElement));
  
    setListings(parsedListings);
  }, [listingsHtml]);
  
  return (
    <div>
      <h1>Home Listings</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing, index) => (
            <tr key={index}>
              <td>{listing.title}</td>
              <td>{listing.price}</td>
              <td>{listing.description}</td>
              <td>
                <img src={listing.image} alt="Home" height="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeListings;
