import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Propertylistings() {
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/property/propertyList`)
      .then((res) => res.json())
      .then((res) => {
        setPropertyList(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const showDetails = (propertyId) => {
    navigate(`/property/details/${propertyId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center bg-gray-200 p-4">
      <div className="grid grid-cols-4 gap-6">
        {propertyList.map((item) => (
          <div
            key={item._id}
            onClick={() => showDetails(item._id)}
            className="w-[300px] h-[500px] bg-white rounded-xl cursor-pointer"
          >
            <img
              src={item.images?.[0]}
              alt=""
              className="mb-4 rounded-xl"
              loading="lazy"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="p-3">
              <p className="text-2xl mb-2">{item.title}</p>
              <p className="mb-2">{item.description}</p>
              <p>Location: {item.location}</p>
              <p>Seller: {item.sellername}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Propertylistings;
