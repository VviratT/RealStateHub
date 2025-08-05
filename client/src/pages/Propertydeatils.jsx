import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sellerImg from "../assets/seller.png";

const PropertyDetails = () => {
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/property/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch property");
        return res.json();
      })
      .then((res) => {
        setPropertyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading.......</div>;
  if (!propertyData) return <div>Property not found</div>;

  const {
    title,
    description,
    location,
    propertyType,
    bedrooms,
    bathrooms,
    price,
    address,
    phoneno,
    images = [],
    seller = {},
  } = propertyData;

  return (
    <div className="flex">
      {/* Left: Property Details */}
      <div className="p-4 w-2/3">
        <div>
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt="Property"
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="py-4">
          <p className="p-4 text-3xl">{title}</p>
          <p className="px-4 text-md">{location}</p>
          <p className="p-4 text-lg">{description}</p>
        </div>

        <div>
          <p className="px-4">Property Type: {propertyType}</p>
          <p className="px-4">Bedrooms: {bedrooms}</p>
          <p className="px-4">Bathrooms: {bathrooms}</p>
          <p className="px-4">Price: ${price}</p>
        </div>
      </div>

      {/* Right: Seller Info */}
      <div className="p-4 w-1/3 mt-8 border-l-2">
        <div className="text-2xl p-3 text-center my-8">Seller Details</div>
        <div className="flex">
          <div className="p-3">
            <img src={sellerImg} alt="Seller" className="w-20 h-20" />
          </div>
          <div className="p-3 text-xl flex flex-col gap-5">
            <div>
              Seller Name: {seller.fullname || seller.username || "N/A"}
            </div>
            <div>Contact: {seller.email || "N/A"}</div>
            <div>Mobile: +91 {phoneno || 9302720802}</div>
            <div>Address: {address || "Bhopal, Madhya Pradesh"}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <button className="p-2 m-4 text-white font-semibold bg-blue-400 rounded-lg hover:bg-blue-600 w-80">
              Inquire About This Property
            </button>
          </div>
          <div className="flex justify-center">
            <button className="p-2 m-4 text-white font-semibold bg-green-400 rounded-lg hover:bg-green-600 w-80">
              Schedule A Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
