import { useState } from "react";
import "./App.css";

function App() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [leaves, setLeaves] = useState("");
  const [exemptions, setExemptions] = useState("");

  // Generate years from 2026 to next 10 years
  const years = Array.from({ length: 11 }, (_, i) => 2026 + i);

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  // Calculate working days for selected year + month
  const calculateWorkingDays = (year, month) => {
    let count = 0;
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
    return count;
  };

  const totalWorkingDays =
    year && month !== ""
      ? calculateWorkingDays(Number(year), Number(month))
      : 0;

  const remainingDays = Math.max(
    totalWorkingDays - Number(leaves) - Number(exemptions),
    0
  );

  const mandatoryOfficeDays = Math.ceil(remainingDays * 0.6);

  const renderOptions = (max) =>
    Array.from({ length: max + 1 }, (_, i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ));

  return (
    <div className="app">
      <div className="card">
        <h2>Hybrid Work Calculator</h2>

        <div className="field">
          <label>Select Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Select Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled={!year}
          >
            <option value="">Select month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="info">
          Total Working Days: <strong>{totalWorkingDays}</strong>
        </div>

        <div className="field">
          <label>Applied Leaves</label>
          <select value={leaves} onChange={(e) => setLeaves(e.target.value)}>
            <option value="">Select leaves</option>
            {renderOptions(20)}
          </select>
        </div>

        <div className="field">
          <label>Exemption Days</label>
          <div className="sub-label">Project / Base Location Holiday</div>
          <select
            value={exemptions}
            onChange={(e) => setExemptions(e.target.value)}
          >
            <option value="">Select exemptions</option>
            {renderOptions(15)}
          </select>
        </div>

        <hr />

        <div className="result">
          <p>
            Remaining Working Days
            <span>{remainingDays}</span>
          </p>
          <p>
            Mandatory Office Days (60%)
            <span>{mandatoryOfficeDays}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;