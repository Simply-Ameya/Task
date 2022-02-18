import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    isClicked: true,
    stateData: [],
    districtData: [],
    selectedDistrictId: 0,
    currentDate: "",
    sessions: [],
    neededDates: [],
    today: "",
    tomorrow: "",
    dayAfterTomorrow: "",
    pin: "",
  };

  async componentDidMount() {
    await this.fetchStateData();
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    this.setState({ currentDate: dd });
  }

  fetchStateData = async () => {
    const url = "http://api.ngminds.com/states.json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ stateData: data.states });
  };

  async handleStateChange(e) {
    const selectedState = this.state.stateData.filter(
      (eachState) => eachState.state_name === e.target.value
    );
    const districtUrl = `http://api.ngminds.com/${selectedState[0].state_id}.json`;
    const districtResponse = await fetch(districtUrl);
    const districtData = await districtResponse.json();
    this.setState({ districtData: districtData.districts });
  }

  handleDistrictChange(e) {
    const selectedDistrict = this.state.districtData.filter(
      (eachDistrict) => eachDistrict.district_name === e.target.value
    );
    this.setState({ selectedDistrictId: selectedDistrict[0].district_id });
  }

  handleSearch() {
    this.fetchData();
  }

  async fetchData() {
    if (this.state.pin === "") {
      let today = new Date();
      const dd = this.state.currentDate;
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      const tomorrow = Number(dd) + 1 + "-" + mm + "-" + yyyy;
      const dayAfterTomorrow = Number(dd) + 2 + "-" + mm + "-" + yyyy;
      this.setState({
        today: today,
        tomorrow: tomorrow,
        dayAfterTomorrow: dayAfterTomorrow,
      });
      let vaccinationData = [];

      let fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${today}`;
      let vaccinationResponse = await fetch(fetchUrl);
      let vaccinationToday = await vaccinationResponse.json();
      vaccinationData.push(vaccinationToday.sessions);

      fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${tomorrow}`;
      vaccinationResponse = await fetch(fetchUrl);
      const vaccinationTomorrow = await vaccinationResponse.json();
      vaccinationData.push(vaccinationTomorrow.sessions);

      fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${dayAfterTomorrow}`;
      vaccinationResponse = await fetch(fetchUrl);
      const vaccinationDayAfterTomorrow = await vaccinationResponse.json();
      vaccinationData.push(vaccinationDayAfterTomorrow.sessions);
      this.setState({ sessions: vaccinationData });
      console.log(vaccinationData);
    } else {
      let today = new Date();
      const dd = this.state.currentDate;
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      const tomorrow = Number(dd) + 1 + "-" + mm + "-" + yyyy;
      const dayAfterTomorrow = Number(dd) + 2 + "-" + mm + "-" + yyyy;
      this.setState({
        today: today,
        tomorrow: tomorrow,
        dayAfterTomorrow: dayAfterTomorrow,
      });
      let vaccinationData = [];

      let fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pin}&date=${today}`;
      let vaccinationResponse = await fetch(fetchUrl);
      let vaccinationToday = await vaccinationResponse.json();
      vaccinationData.push(vaccinationToday.sessions);

      fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${tomorrow}`;
      vaccinationResponse = await fetch(fetchUrl);
      const vaccinationTomorrow = await vaccinationResponse.json();
      vaccinationData.push(vaccinationTomorrow.sessions);

      fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${dayAfterTomorrow}`;
      vaccinationResponse = await fetch(fetchUrl);
      const vaccinationDayAfterTomorrow = await vaccinationResponse.json();
      vaccinationData.push(vaccinationDayAfterTomorrow.sessions);
      this.setState({ sessions: vaccinationData });
      console.log(vaccinationData);
    }
  }

  async handleNext() {
    let today = new Date();
    const dd = this.state.currentDate;
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = Number(dd) + 3 + "-" + mm + "-" + yyyy;
    const tomorrow = Number(dd) + 4 + "-" + mm + "-" + yyyy;
    const dayAfterTomorrow = Number(dd) + 5 + "-" + mm + "-" + yyyy;
    this.setState({
      currentDate: dd,
      today: today,
      tomorrow: tomorrow,
      dayAfterTomorrow: dayAfterTomorrow,
    });
    let vaccinationData = [];

    let fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${today}`;
    let vaccinationResponse = await fetch(fetchUrl);
    let vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);

    fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${tomorrow}`;
    vaccinationResponse = await fetch(fetchUrl);
    vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);

    fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${dayAfterTomorrow}`;
    vaccinationResponse = await fetch(fetchUrl);
    vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);
    this.setState({ sessions: vaccinationData });
    console.log(vaccinationData);
  }

  async handlePrevious() {
    let today = new Date();
    const dd = this.state.currentDate;
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = Number(dd) - 3 + "-" + mm + "-" + yyyy;
    const tomorrow = Number(dd) - 2 + "-" + mm + "-" + yyyy;
    const dayAfterTomorrow = Number(dd) - 1 + "-" + mm + "-" + yyyy;
    this.setState({
      currentDate: dd,
      today: today,
      tomorrow: tomorrow,
      dayAfterTomorrow: dayAfterTomorrow,
    });
    let vaccinationData = [];

    let fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${today}`;
    let vaccinationResponse = await fetch(fetchUrl);
    let vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);

    fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${tomorrow}`;
    vaccinationResponse = await fetch(fetchUrl);
    vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);

    fetchUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrictId}&date=${dayAfterTomorrow}`;
    vaccinationResponse = await fetch(fetchUrl);
    vaccinationToday = await vaccinationResponse.json();
    vaccinationData.push(vaccinationToday.sessions);
    this.setState({ sessions: vaccinationData });
    console.log(vaccinationData);
  }

  render() {
    const firstSession = this.state.sessions[0];
    const secondSession = this.state.sessions[1];
    const thirdSession = this.state.sessions[2];

    const longest = Math.max(
      firstSession?.length,
      secondSession?.length,
      thirdSession?.length
    );
    const longestSession = this.state.sessions?.filter(
      (each) => each.length === longest
    )[0];
    const sessionindex = this.state.sessions?.indexOf(longestSession);

    return (
      <div className="App">
        <h1>Search your Nearest Vaccination Center</h1>
        <div className="find-button-container">
          <button
            className={this.state.isClicked ? "btn btn-primary" : "button"}
            onClick={() => {
              this.setState({ isClicked: true });
            }}
          >
            Find By District
          </button>
          <button
            className={!this.state.isClicked ? "btn btn-primary" : "button"}
            onClick={() => {
              this.setState({ isClicked: false });
            }}
          >
            Find By PIN
          </button>
        </div>
        <div>
          {this.state.isClicked ? (
            <>
              <select
                className="select"
                onChange={(e) => this.handleStateChange(e)}
              >
                {this.state.stateData &&
                  this.state.stateData.map((eachState) => (
                    <option
                      key={eachState.state_id}
                      value={eachState.state_name}
                    >
                      {eachState.state_name}
                    </option>
                  ))}
              </select>
              <select
                className="select"
                onChange={(e) => this.handleDistrictChange(e)}
              >
                {this.state.districtData?.map((eachDistrict) => (
                  <option
                    key={eachDistrict.district_name}
                    value={eachDistrict.district_name}
                  >
                    {eachDistrict.district_name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ pin: e.target.value });
                }}
              />
            </>
          )}
          <button className="btn btn-info" onClick={() => this.handleSearch()}>
            Search
          </button>
        </div>
        <p>Slot Search Results (81 center(s) found)</p>
        <div className="card datesss">
          <div className="card-header">
            <div className="row">
              <div className="col-3 text-end pt-2">
                <h2>〈</h2>
              </div>
              <div className="col">
                <div className="card my-2">
                  <div className="card-body py-1 my-1">
                    <strong>
                      <small>{this.state.today}</small>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card my-2">
                  <div className="card-body py-1 my-1">
                    <strong>
                      <small>{this.state.tomorrow}</small>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card my-2">
                  <div className="card-body py-1 my-1">
                    <strong>
                      <small>{this.state.dayAfterTomorrow}</small>
                    </strong>
                  </div>
                </div>
              </div>

              <div className="col-auto pt-2">
                <h2>〉</h2>
              </div>
            </div>
          </div>
        </div>
        <table>
          <tbody>
            {this.state.sessions[sessionindex]?.map((eachSession) => (
              <tr key={eachSession.session_id}>
                <td className="center-details">
                  <h1 className="center-name">{eachSession.name}</h1>
                  <p className="center-address">{eachSession.address}</p>
                  <p className="center-pin">
                    <span>{eachSession.state_name}</span>
                    <span>{eachSession.pincode}</span>
                  </p>
                  <h2 className="center-vaccine">
                    {eachSession.vaccine}
                    {eachSession.fee_type === "Free" ? (
                      <span className="btn-success">Free</span>
                    ) : (
                      <span className="btn-warning">Free</span>
                    )}
                  </h2>
                  <p className="center-age">
                    {eachSession.min_age_limit} {"&"} Above
                    {eachSession.available_capacity_dose1 !== 0 ? (
                      <span>Dose 1</span>
                    ) : eachSession.available_capacity_dose2 === 0 ? (
                      <span>Dose 2</span>
                    ) : (
                      <span>Precaution</span>
                    )}
                  </p>
                </td>
                <td>
                  {this.state.sessions[0].find((each) => {
                    return each.center_id === eachSession.center_id;
                  }) ? (
                    <div className="slot-card">
                      {this.state.sessions[0].filter(
                        (each) => each.center_id === eachSession.center_id
                      )[0].available_capacity !== 0 ? (
                        <span className="slots-available">
                          {JSON.stringify(
                            this.state.sessions[0].filter(
                              (each) => each.center_id === eachSession.center_id
                            )[0].available_capacity
                          )}
                          slots
                        </span>
                      ) : (
                        <span className="slots-unavailable">{"Booked"}</span>
                      )}
                    </div>
                  ) : (
                    <div className="slot-card">N/A</div>
                  )}
                </td>
                <td>
                  {this.state.sessions[1].find((each) => {
                    return each.center_id === eachSession.center_id;
                  }) ? (
                    <div className="slot-card">
                      {this.state.sessions[1].filter(
                        (each) => each.center_id === eachSession.center_id
                      )[0].available_capacity !== 0 ? (
                        <span className="slots-available">
                          {JSON.stringify(
                            this.state.sessions[1].filter(
                              (each) => each.center_id === eachSession.center_id
                            )[0].available_capacity
                          )}
                          slots
                        </span>
                      ) : (
                        <span className="slots-unavailable">{"Booked"}</span>
                      )}
                    </div>
                  ) : (
                    <div className="slot-card">N/A</div>
                  )}
                </td>
                <td>
                  {this.state.sessions[2].find((each) => {
                    return each.center_id === eachSession.center_id;
                  }) ? (
                    <div className="slot-card">
                      {this.state.sessions[2].filter(
                        (each) => each.center_id === eachSession.center_id
                      )[0].available_capacity !== 0 ? (
                        <span className="slots-available">
                          {JSON.stringify(
                            this.state.sessions[2].filter(
                              (each) => each.center_id === eachSession.center_id
                            )[0].available_capacity
                          )}
                          slots
                        </span>
                      ) : (
                        <span className="slots-unavailable">{"Booked"}</span>
                      )}
                    </div>
                  ) : (
                    <div className="slot-card">N/A</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
