import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

const GenerateHallticket = () => {
  const [studentId, setStudentId] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [hallticketData, setHallticketData] = useState(null);
  const ticketRef = useRef(null); // <-- Ref to capture hallticket div

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hallticket-f0z0.onrender.com/api/generate-hallticket/generate",
        { studentId, location, time }
      );

      setHallticketData(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch hallticket");
    }
  };

  const handleDownload = () => {
    if (!ticketRef.current) return;
  
    setTimeout(() => {
      html2canvas(ticketRef.current, {
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${studentId}_hallticket.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }, 500); // Wait 500ms to ensure image loads
  };
  

  return (
    <div>
      <form onSubmit={handleGenerate} className="hallticket-form">
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Student ID"
          required
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">Select Location</option>
          <option value="Kerala English Medium High School Dharmapuri">Kerala English Medium High School Dharmapuri</option>
          <option value="Apple Computers Dharmapuri">Bangalore</option>
          {/* <option value="Chennai">Chennai</option>
          <option value="Delhi">Delhi</option> */}
        </select>

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Generate Hallticket</button>
      </form>

      {hallticketData && (
        <>
          <div className="hallticket" ref={ticketRef} style={{ padding: "20px", border: "2px solid #333",borderRadius: "10px", marginTop: "20px", position: "relative", backgroundColor: "#fff"}}>
            <h1>Isha Institutions Of Computer Education</h1>
            <p style={{ textAlign: "center" }}>
              State: Telangana, Dist: Jagitial, MDL: Dharmapuri, Pin: 505425
            </p>
            <hr style={{ width:"100%", margin: "20px 0", border: "1px solid #000" }} /> 
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
  <tbody>
    <tr>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>ID:</strong></td>
      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.student.studentId}</td>
      <td
        rowSpan="6"
        style={{
          textAlign: "center",
          verticalAlign: "top",
          border: "1px solid #ccc",
          padding: "8px",
        }}
      >
       {hallticketData?.student?.photo && ( <img
          src={`https://hallticket-f0z0.onrender.com/${hallticketData.student.photo}`}
          alt="Student"
          crossOrigin="anonymous"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      )}
      </td>
    </tr>
    {/* Repeat similar <td> styles for other rows */}

                <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>Name:</strong></td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.student.name}</td>
                </tr>
                <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>Father's Name:</strong></td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.student.fatherName}</td>
                </tr>
                <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>Course:</strong></td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.student.course}</td>
                </tr>
                <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>Location:</strong></td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.location}</td>
                </tr>
                <tr>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}><strong>Time:</strong></td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{hallticketData.time}</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ textAlign: "left" }}>Instructions</h2>
            <p>1. Report to the exam center at least 30 minutes before the scheduled time.</p>
            <p>2. Bring your exam pad, pens, and required stationery.</p>
            <p>3. Carry your hall ticket and a valid photo ID to the exam center.</p>
            <p>4. Mobile phones, smartwatches, and electronic gadgets are strictly prohibited.</p>
            <p>5. Maintain silence and discipline inside the examination hall.</p>

                <h4 style={{ textAlign: "right" }}>Pricipal</h4>
                <p style={{ textAlign: "right" }}>P.Rajesh</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  <button
    onClick={handleDownload}
    style={{
      background: "green",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Download Hallticket as Image
  </button>
</div>


        </>
      )}
    </div>
  );
};

export default GenerateHallticket;
