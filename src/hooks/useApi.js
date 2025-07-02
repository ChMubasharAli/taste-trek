import { useState } from "react";
import axios from "axios";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle different HTTP methods dynamically
  const request = async (url, method = "GET", payload = null) => {
    setLoading(true);
    setError(null); // Clear previous errors
    setData(null);

    try {
      let response;
      // Depending on the method, send the request with appropriate options
      if (method === "GET") {
        response = await axios.get(url);
      } else if (method === "POST") {
        response = await axios.post(url, payload);
      } else if (method === "PUT") {
        response = await axios.put(url, payload);
      } else if (method === "DELETE") {
        response = await axios.delete(url);
      }
      if (response.data) {
        console.log("Response is ", response.data);
        setData(response.data); // Set the data from the response
      }
    } catch (err) {
      console.log("Error is ", err.response);
      setData(null);
      setError(
        err.response.data.message
          ? err.response.data.message
          : "Something went wrong plese try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default useApi;
