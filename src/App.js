import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Rides from "./Rides";

function App() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [nearestRides, setNearestRides] = useState([]);

  const fetchRides = async () => {
    try {
      const response = await fetch("https://assessment.api.vweb.app/rides");

      const handleSuccess = async () => {
        const ridesRecords = await response.json();
        ridesRecords.map((item) => {
          let arr = item?.station_path;
          arr = arr.sort();
          if (userInfo?.station_code > arr[0]) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] === userInfo?.station_code) {
                setNearestRides(nearestRides.push(arr[i]))
                break;
              } else if (arr[i] >= userInfo?.station_code) {
                setNearestRides(nearestRides.push(arr[i]))
                break;
              }
            }
          }
        });
        console.log(nearestRides);
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
        console.log(userData?.station_code)
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
      <Rides />
    </>
  );
}

export default App;
