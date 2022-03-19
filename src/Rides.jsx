import { useEffect, useState } from "react";
import NearestRides from "./NearestRides";

const Rides = ({allRides, destination_code}) => {


  const [nearestRides, setNearestRides] = useState([]);

  const filterNearest = (ridesLst) => {
    let tmp = ridesLst.map(item=>{
      let arr = item?.station_path;
      arr = arr.sort();
      for(let i = 0; i < arr.length; i++){
        if(arr[i] === destination_code || arr[i] >= destination_code && !arr[i] < destination_code){
          const val = {...item, path: arr[i], distance: Math.abs(arr[i]-destination_code)}
          return val;
        }
      }
    })
    tmp = tmp.sort((a, b)=>{
      return a.path - b.path
    });
    setNearestRides(tmp)
  };

  useEffect(()=>{
    filterNearest(allRides);
  }, [])

  return (
    <main className="main">
      <div className="buttons-container">
        <div>
          <button className="btn active">Nearest rides</button>
          <button className="btn">Upcoming rides</button>
          <button className="btn">Past rides</button>
        </div>
        <div className="filters"> 
          <span>Filters</span>
        </div>
      </div>
      <section>
          {
            nearestRides.length > 0 
            ?
            nearestRides.map((item, index)=>{
              return(<NearestRides ride = { item } key={index}/>)
            })
            :
            <h2>No Records</h2>
          }
      </section>
    </main>
  );
};

export default Rides;
