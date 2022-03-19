import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import NearestRides from "./NearestRides";
import Rides from "./Rides";

function App() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [allRides, setAllRides] = useState(null);

  const fetchRides = async () => {
    try {
      const response = await fetch("https://assessment.api.vweb.app/rides");

      const handleSuccess = async () => {
        const ridesRecords = await response.json();
        console.log(ridesRecords)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        setAllRides(ridesRecords);
        setLoading(false);
      };

      switch (response.status) {
        case 200:
          return handleSuccess();
        default:
          alert("Someting went wrong....");
          setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(`Got this error while fetching rides ${err}`);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://assessment.api.vweb.app/user");

      const handleSuccess = async () => {
        const userData = await response.json();
        setUserInfo(userData);
        console.log(userData);
        fetchRides();
      };

      switch (response.status) {
        case 200:
          return handleSuccess();
        default:
          alert("Someting went wrong....");
          setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(`Got this error while fetching user info ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h3 className="loader">Loading...</h3>;
  }

  return (
    <>
      <Header user={userInfo} />
      <Rides allRides={allRides} destination_code={userInfo?.station_code}/>
    </>
  );
}

export default App;
