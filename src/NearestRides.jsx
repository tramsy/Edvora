import map from "./assests/map_pics.png";

const NearestRides = () => {
  return (
    <>
      <article className="record">
        <div className="record__details">
          <div className="record__img">
            <img src={map} alt="#" />
          </div>
          <div className="record__info">
            <p>
              Ride id: <span>002</span>
            </p>
            <p>
              Origin Station: <span>20</span>
            </p>
            <p>
              Station Path: <span>[20, 49, 80, 39, 43, 72]</span>
            </p>
            <p>
              Date: <span>05th FEB 2022</span>
            </p>
            <p>
              Distance: <span>0</span>
            </p>
          </div>
        </div>
        <div>
          <span className="geo-info">City Name</span>
          <span className="geo-info">State Name</span>
        </div>
      </article>
      <article className="record">
        <div className="record__details">
          <div className="record__img">
            <img src={map} alt="#" />
          </div>
          <div className="record__info">
            <p>
              Ride id: <span>002</span>
            </p>
            <p>
              Origin Station: <span>20</span>
            </p>
            <p>
              Station Path: <span>[20, 49, 80, 39, 43, 72]</span>
            </p>
            <p>
              Date: <span>05th FEB 2022</span>
            </p>
            <p>
              Distance: <span>0</span>
            </p>
          </div>
        </div>
        <div>
          <span className="geo-info">City Name</span>
          <span className="geo-info">State Name</span>
        </div>
      </article>
      <article className="record">
      <div className="record__details">
        <div className="record__img">
          <img src={map} alt="#" />
        </div>
        <div className="record__info">
          <p>
            Ride id: <span>002</span>
          </p>
          <p>
            Origin Station: <span>20</span>
          </p>
          <p>
            Station Path: <span>[20, 49, 80, 39, 43, 72]</span>
          </p>
          <p>
            Date: <span>05th FEB 2022</span>
          </p>
          <p>
            Distance: <span>0</span>
          </p>
        </div>
      </div>
      <div>
        <span className="geo-info">City Name</span>
        <span className="geo-info">State Name</span>
      </div>
    </article>
    </>
  );
};

export default NearestRides;
