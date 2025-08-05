import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [error, setError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const fetchUserListings = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/userListings`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      setUserListings(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  const showDetails = (propertyId) => {
    navigate(`/property/details/${propertyId}`);
  };

  const AddProp = async (data) => {
    setWait(true);
    const formData = new FormData();
    for (let key in data) {
      if (key === "photos") {
        formData.append("photos", data.photos[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/user/new-property`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await res.json();

    if (result?.statuscode === 200) {
      setError(false);
      fetchUserListings(); // Refresh listings
      reset();
    } else {
      setError(true);
    }

    setWait(false);
  };

  if (wait) return <div>Wait......</div>;

  return (
    <div>
      <div className="text-3xl text-blue-400 font-semibold text-center p-6">
        My Listings
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6 p-6">
          {userListings.map((item) => (
            <div
              key={item._id}
              onClick={() => showDetails(item._id)}
              className="w-[300px] bg-gray-100 rounded-xl cursor-pointer"
            >
              <img src={item.images?.[0]} alt="" className="mb-4" />
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
      )}

      <div className="text-3xl text-blue-400 font-semibold text-center p-6">
        Add A New Property
      </div>
      <div className="flex justify-center p-6">
        <form
          onSubmit={handleSubmit(AddProp)}
          className="bg-gray-100 rounded-lg p-6 w-1/2"
        >
          {[
            "title",
            "description",
            "location",
            "price",
            "bedrooms",
            "bathrooms",
            "propertyType",
            "address",
          ].map((field) => (
            <div className="grid grid-cols-2 m-4" key={field}>
              <label className="text-xl capitalize">{field}:</label>
              <input
                type="text"
                {...register(field)}
                className="p-2 rounded-lg"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 m-4">
            <label className="text-xl">Image:</label>
            <input
              type="file"
              accept="image/*"
              {...register("photos")}
              className="p-2 rounded-lg"
            />
          </div>
          {error && (
            <div className="text-center text-red-400 text-lg p-4">
              Error: Property with same title exists!
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 text-xl w-60 rounded bg-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
