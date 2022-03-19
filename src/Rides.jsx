import NearestRides from "./NearestRides";

const Rides = () => {
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
          <NearestRides />
      </section>
    </main>
  );
};

export default Rides;
