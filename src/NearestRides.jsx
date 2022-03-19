import map from "./assests/map_pics.png";

const NearestRides = ({ ride }) => {
  const{id, origin_station_code, station_path, distance, date, map_url, state, city} = ride;
  return (
    <>
      <article className="record">
        <div className="record__details">
          <div className="record__img">
            <img src={map_url} alt="#" />
          </div>
          <div className="record__info">
            <p>
              Ride id: <span>{ id }</span>
            </p>
            <p>
              Origin Station: <span>{ origin_station_code }</span>
            </p>
            <p>
              Station Path: <span>{ `[${station_path}]` }</span>
            </p>
            <p>
              Date: <span>{ date }</span>
            </p>
            <p>
              Distance: <span>{ distance }</span>
            </p>
          </div>
        </div>
        <div>
          <span className="geo-info">{ city }</span>
          <span className="geo-info">{ state }</span>
        </div>
      </article>
    </>
  );
};

export default NearestRides;
