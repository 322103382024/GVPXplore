import React, { useState } from 'react';
import HostelDetailsForm from './HostelDetailsForm';
import WardenTable from './WardenTable';
import './Hostel.css';

const hostelData = [
  {
    id: 'boys',
    name: "Boys Hostel",
    image: "boys_hostel.jpg",
    description: "80 rooms, 2 beds per room, ₹30,000/year",
    facilities: ["Wi-Fi", "Gym", "Laundry"],
  },
  {
    id: 'girls',
    name: "Girls Hostel",
    image: "girls_hostel.jpg",
    description: "75 rooms, 3 beds per room, ₹28,000/year",
    facilities: ["Wi-Fi", "Security", "Study Hall"],
  },
  {
    id: 'harmony',
    name: "Harmony PG",
    image: "PG_hostel.jpg",
    description: "40 rooms, 1-2 beds, ₹35,000/year",
    facilities: ["AC", "Mess", "Parking"],
  },
  {
    id: 'sunshine',
    name: "Sunshine Hostel",
    image: "other_hostel.jpg",
    description: "50 rooms, 2 beds, ₹32,000/year",
    facilities: ["Lift", "Generator", "CCTV"],
  },
];

function HostelOverview() {
  const [selectedHostel, setSelectedHostel] = useState(null);

  const handleSelect = (hostel) => {
    setSelectedHostel(hostel);
  };

  return (
    <div className="hostel-container">
      <h2>Select Your Hostel</h2>
      <div className="hostel-grid">
        {hostelData.map((hostel) => (
          <div
            key={hostel.id}
            className="hostel-card"
            onClick={() => handleSelect(hostel)}
          >
            <img src={hostel.image} alt={hostel.name} />
            <h3>{hostel.name}</h3>
            <p>{hostel.description}</p>
            <ul>
              {hostel.facilities.map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedHostel && (
        <>
          <HostelDetailsForm selectedHostel={selectedHostel} />
          <WardenTable hostelId={selectedHostel.id} />
        </>
      )}
    </div>
  );
}

export default HostelOverview;
