import { useEffect, useState } from "react";
import FilteredRides from "./FilteredRides";
import filterIcon from "./assests/Vector.png";

const Rides = ({ allRides, destination_code }) => {
  const [nearestRides, setNearestRides] = useState([]);
  const [upComingRides, setUpComingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [serachFilter, setSearchFilter] = useState({state: "", city: ""})


  const filterNearest = (ridesLst, flag=false) => {
    let tmp = ridesLst.map((item) => {
      if(!flag){
        setAllStates((current)=> [...current, item.state])
        setAllCities((current)=> [...current, item.city]);
      }
      let arr = item?.station_path;
      arr = arr.sort();
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i] === destination_code ||
          (arr[i] >= destination_code && !arr[i] < destination_code)
        ) {
          const val = {
            ...item,
            path: arr[i],
            distance: Math.abs(arr[i] - destination_code),
          };
          return val;
        }
      }
    });
    tmp = tmp.sort((a, b) => {
      return a.path - b.path;
    });
    setNearestRides(tmp);
  };

  const filterByDate = (rideLst, timeZone) => {
    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, "0"));
    var mm = parseInt(String(today.getMonth() + 1).padStart(2, "0"));
    var yyyy = parseInt(today.getFullYear());

    if (timeZone === "upcoming") {
      const up_coming = rideLst.filter((item) => {
        const dateArr = item.date.split(" ")[0].split("/");
        if (
          dd < parseInt(dateArr[1]) &&
          mm <= parseInt(dateArr[0]) &&
          yyyy <= parseInt(dateArr[2])
        ) {
          return item;
        }
      });
      setUpComingRides(up_coming);
    }
    if (timeZone === "past") {
      const tmp = rideLst.filter((item) => {
        const dateArr = item.date.split(" ")[0].split("/");
        if (
          dd > parseInt(dateArr[1]) &&
          mm >= parseInt(dateArr[0]) &&
          yyyy >= parseInt(dateArr[2])
        ) {
          return item;
        }
      });
      // console.log(tmp);
      setPastRides(tmp);
    }
  };

  

  const toggleTab = (eve) => {
    const selectedBtn = eve.target.id;
    console.log(selectedBtn);
    const btnLst = document.querySelectorAll(".btn");
    btnLst.forEach((btn) => {
      if (btn.id === selectedBtn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    setActiveTab(
      selectedBtn === "nearest_rides"
        ? 0
        : selectedBtn === "upcoming_rides"
        ? 1
        : 2
    );
  };


  const handleChange = (eve) =>{
    console.log(eve.target.name, eve.target.value);
    const {name, value} = eve.target;
    if(name === "state" && value !== "state"){
      const filteredByState = allRides.filter(item=>item.state===value && item)
      filterNearest(filteredByState, true);
      filterByDate(filteredByState, "upcoming");
      filterByDate(filteredByState, "past");
      setAllCities(filteredByState.map(item=>item.city));
    }
    if(name === "city" && value !== "city"){
      if(serachFilter.state !== ""){
        const filteredByStateAndCity = allRides.filter(item=>item.state===serachFilter.state && item.city === value && item)
        filterNearest(filteredByStateAndCity);
        filterByDate(filteredByStateAndCity, "upcoming");
        filterByDate(filteredByStateAndCity, "past");
        setAllCities(filteredByStateAndCity.map(item=>item.city));
      }else{
        const filteredByCity = allRides.filter(item=>item.city === value && item)
        filterNearest(filteredByCity, true);
        filterByDate(filteredByCity, "upcoming");
        filterByDate(filteredByCity, "past");
      }
    }
    setSearchFilter((prev)=>{
      return({...prev, [name] : value})
    })
  }

  const clearFilters = ()=>{
    filterNearest(allRides);
    filterByDate(allRides, "upcoming");
    filterByDate(allRides, "past");
    setSearchFilter({state: "", city: ""})
  }

  useEffect(() => {
    filterNearest(allRides);
    filterByDate(allRides, "upcoming");
    filterByDate(allRides, "past");
  }, []);


  return (
    <main className="main">
      <div className="buttons-container">
        <div>
          <button
            className="btn active"
            onClick={(eve) => {
              toggleTab(eve);
            }}
            id="nearest_rides"
          >
            Nearest rides
          </button>
          <button
            className="btn"
            id="upcoming_rides"
            onClick={(eve) => {
              toggleTab(eve);
            }}
          >
            Upcoming rides {`(${upComingRides.length})`}
          </button>
          <button
            className="btn"
            id="past_rides"
            onClick={(eve) => {
              toggleTab(eve);
            }}
          >
            Past rides {`(${pastRides.length})`}
          </button>
        </div>
        <div className="filters">
          <img src={filterIcon} alt="#" className="filter-icon" />
          <span
            onClick={() => {
              setFilterVisibility(!filterVisibility);
            }}
          >
            Filters
          </span>
          {filterVisibility && (
            <div className="filters-container">
              <p className="filter-tag">Filters</p>
              <hr />
              <div className="filters-frm">
                <select className="frm-select" name="state" value={serachFilter.state} onChange={handleChange}>
                <option value="state">state</option>
                  {
                    allStates.map((item, index)=>{
                      return(<option value={item} key={index}>{item}</option>)
                    })
                  }
                </select>
                <select className="frm-select" name="city" value={serachFilter.city} onChange={handleChange}>
                <option value="city">city</option>
                  {
                    allCities.map((item, index)=>{
                      return(<option value={item} key={index}>{item}</option>)
                    })
                  }
                </select>
                <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <section>
        {nearestRides.length > 0 && activeTab === 0
          ? nearestRides.map((item, index) => {
              return <FilteredRides ride={item} key={index} />;
            })
          : upComingRides.length > 0 && activeTab === 1
          ? upComingRides.map((item, index) => {
              //e.log(item)
              return <FilteredRides ride={item} key={index} />;
            })
          : pastRides.length > 0 && activeTab === 2
          ? pastRides.map((item, index) => {
              return <FilteredRides ride={item} key={index} />;
            })
          : null}
      </section>
    </main>
  );
};

export default Rides;
