import { useState } from "react";

export default function YellowRideApp() {
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({ name: "", phone: "" });
  const [rideRequest, setRideRequest] = useState({ type: "Taxi", pickup: "", destination: "" });
  const [driver, setDriver] = useState({ name: "", phone: "", vehicle: "Taxi", plate: "" });
  const [registeringDriver, setRegisteringDriver] = useState(false);

  const handleRegister = () => {
    if (user.name && user.phone) {
      setRegistered(true);
    } else {
      alert("Please enter your name and phone number.");
    }
  };

  const handleRequestRide = () => {
    if (rideRequest.pickup && rideRequest.destination) {
      const row = [user.name, user.phone, rideRequest.type, rideRequest.pickup, rideRequest.destination, new Date().toISOString()];
      fetch("https://sheetdb.io/api/v1/4m3o7tqujxm7q", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [row] })
      });
      alert("Your ride has been requested!");
      setRideRequest({ type: "Taxi", pickup: "", destination: "" });
    } else {
      alert("Please fill in both pickup and destination.");
    }
  };

  const handleRegisterDriver = () => {
    if (driver.name && driver.phone && driver.plate) {
      const row = [driver.name, driver.phone, driver.vehicle, driver.plate, new Date().toISOString()];
      fetch("https://sheetdb.io/api/v1/4m3o7tqujxm7q?sheet=Driver%20Registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [row] })
      });
      alert("Driver registration successful!");
      setDriver({ name: "", phone: "", vehicle: "Taxi", plate: "" });
    } else {
      alert("Please complete all driver fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">YellowRide Navrongo</h1>

      {!registered ? (
        <div className="space-y-3">
          <label>Name</label>
          <input className="w-full border p-2" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          <label>Phone Number</label>
          <input className="w-full border p-2" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          <button className="w-full bg-yellow-500 text-white py-2" onClick={handleRegister}>Register</button>
          <button className="w-full border py-2" onClick={() => setRegisteringDriver(true)}>I'm a Driver</button>
        </div>
      ) : !registeringDriver ? (
        <div className="space-y-3">
          <label>Ride Type</label>
          <select className="w-full border p-2" value={rideRequest.type} onChange={(e) => setRideRequest({ ...rideRequest, type: e.target.value })}>
            <option value="Taxi">Taxi</option>
            <option value="Yellow-Yellow">Yellow-Yellow</option>
          </select>
          <label>Pickup Location</label>
          <input className="w-full border p-2" value={rideRequest.pickup} onChange={(e) => setRideRequest({ ...rideRequest, pickup: e.target.value })} />
          <label>Destination</label>
          <input className="w-full border p-2" value={rideRequest.destination} onChange={(e) => setRideRequest({ ...rideRequest, destination: e.target.value })} />
          <button className="w-full bg-green-600 text-white py-2" onClick={handleRequestRide}>Request Ride</button>
        </div>
      ) : (
        <div className="space-y-3">
          <label>Driver Name</label>
          <input className="w-full border p-2" value={driver.name} onChange={(e) => setDriver({ ...driver, name: e.target.value })} />
          <label>Phone Number</label>
          <input className="w-full border p-2" value={driver.phone} onChange={(e) => setDriver({ ...driver, phone: e.target.value })} />
          <label>Vehicle Type</label>
          <select className="w-full border p-2" value={driver.vehicle} onChange={(e) => setDriver({ ...driver, vehicle: e.target.value })}>
            <option value="Taxi">Taxi</option>
            <option value="Yellow-Yellow">Yellow-Yellow</option>
          </select>
          <label>Plate Number</label>
          <input className="w-full border p-2" value={driver.plate} onChange={(e) => setDriver({ ...driver, plate: e.target.value })} />
          <button className="w-full bg-blue-600 text-white py-2" onClick={handleRegisterDriver}>Register Driver</button>
        </div>
      )}
    </div>
  );
}