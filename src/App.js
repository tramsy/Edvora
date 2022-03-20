import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Rides from "./Rides";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [allRides, setAllRides] = useState(null);

  const fetchRides = async () => {
    try {
      const response = await fetch("https://assessment.api.vweb.app/rides");

      const handleSuccess = async () => {
        const ridesRecords = await response.json();
        if (ridesRecords.length > 0) {
          setAllRides(ridesRecords);
          setLoading(false);
        } else {
          setError(true);
        }
      };

      switch (response.status) {
        case 200:
          return handleSuccess();
        default:
          setError(true);
          setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(`Got this error while fetching rides ${err}`);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://assessment.api.vweb.app/user");

      const handleSuccess = async () => {
        const userData = await response.json();
        if (userData !== null) {
          setUserInfo(userData);
          fetchRides();
        } else {
          setError(true);
        }
      };

      switch (response.status) {
        case 200:
          return handleSuccess();
        default:
          setError(true);
          setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(`Got this error while fetching user info ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h3 className="loader">Loading...</h3>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>Sorry, something went wrong</h3>
        <hr />
        <p>
          got an error while fetching the data from api. Refresh the page or
          check logs for more information
        </p>
      </div>
    );
  }

  return (
    <>
      <Header user={userInfo} />
      <Rides allRides={allRides} destination_code={userInfo?.station_code} />
    </>
  );
}

export default App;
