import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MapView from "./components/MapView";

function App() {

  const [building, setBuilding] = useState("BuildingA");
  const [route, setRoute] = useState([]);
  const [safe, setSafe] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState("");
  const [sensor, setSensor] = useState({});
  const [crowd, setCrowd] = useState({});
  const [algoTime, setAlgoTime] = useState(0);

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/route/${building}`)
      .then((res) => {
        setRoute(res.data.route);
        setAlgoTime(res.data.time_ms);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/safety")
      .then((res) => {
        setSafe(
          res.data.safe === 1
            ? "Safe"
            : "Danger"
        );
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/score")
      .then((res) => {
        setScore(res.data.score);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/time")
      .then((res) => {
        setTime(res.data.time);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/sensor")
      .then((res) => {
        setSensor(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://127.0.0.1:8000/crowd")
      .then((res) => {
        setCrowd(res.data);
      })
      .catch((err) => console.log(err));

  }, [building]);

  return (
    <div className="container">

      <h1 className="title">
        🚨 Emergency Evacuation Path Planner
      </h1>

      <div className="alert-banner">
        FIRE DETECTED • EVACUATION MODE ACTIVE
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>🏢 Select Building</h3>

        <select
          className="select-box"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        >
          <option value="BuildingA">
            Building A
          </option>

          <option value="BuildingB">
            Building B
          </option>
        </select>
      </div>

      <div className="grid">

        <div className="card">
          <h2>📍 Recommended Route</h2>

          {route.map((node, index) => (
            <div
              key={index}
              className="route-item"
            >
              {node}
            </div>
          ))}
        </div>

        <div className="card">
          <h2>🛡 Safety Status</h2>

          <p
            className={
              safe === "Safe"
                ? "safe"
                : "danger"
            }
          >
            {safe}
          </p>

          <h3>📊 Safety Score</h3>

          <p>{score}%</p>
        </div>

        <div className="card">
          <h2>🔥 Sensor Data</h2>

          <p>
            Temperature:
            {" "}
            {sensor.temperature}°C
          </p>

          <p>
            Smoke:
            {" "}
            {sensor.smoke}
          </p>

          <p>
            Gas:
            {" "}
            {sensor.gas}
          </p>
        </div>

        <div className="card">
          <h2>👥 Crowd Prediction</h2>

          <p>
            Exit1:
            {" "}
            {crowd.Exit1}
            {" "}people
          </p>

          <p>
            Exit2:
            {" "}
            {crowd.Exit2}
            {" "}people
          </p>
        </div>

        <div className="card">
          <h2>⏱ Evacuation Time</h2>

          <p>{time}</p>

          <h3>⚡ Algorithm Runtime</h3>

          <p>
            {algoTime}
            {" "}ms
          </p>
        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: "25px" }}
      >
        <h2>🗺 GIS & GPS Emergency Map</h2>

        <MapView />
      </div>

    </div>
  );
}

export default App;