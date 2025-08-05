import React from "react";
function Footer(){
return (
  <div>
    <div className="flex justify-between  bg-black/80 text-white p-6 ">
      <div>
        <p className="text-2xl">RealStateHub</p>
        <p>Your perfect partner in finding the perfect property</p>
      </div>
      <div>
        <p className="text-2xl">Contact Us</p>
        <p>Email: borbanayush09@gmail.com</p>
        <p>Phone: +91 9302720803</p>
      </div>
      <div>
        <p className="text-2xl px-2">Quick Links</p>
        <a href="#" className="p-2 hover:underline">
          Home
        </a>
        <a href="/property/listings" className="p-2 hover:underline">
          Listings
        </a>
        <a href="#" className="p-2 hover:underline">
          About us
        </a>
      </div>
    </div>
  </div>
);
}
export default Footer