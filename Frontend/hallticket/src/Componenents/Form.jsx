import React from 'react';
import icon from "../assets/icon1.png";
import {useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom";

// ...

<div id="dropdownMenu" className="dropdown-content">
  <Link to="/generate-hallticket">
    <button>Generate HallTicket</button>
  </Link>
</div>

const Form = () => {
  const [studentId,setStudentId]=useState("");
  const [name,setName]=useState("")
  const [fatherName,setFatherName]=useState("")
  const [course,setCourse]=useState("")
  const [photo,setPhoto]=useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("name", name);
    formData.append("fatherName", fatherName);
    formData.append("course", course);
    formData.append("photo", photo);

    try {
      const res = await axios.post("http://localhost:5000/api/hallticket/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", res.data);
      alert("Submitted successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed!");
    }
    setStudentId("");setName("");setFatherName(""),setCourse(""),setPhoto(null);
  };
  
  function toggleDropdown() {
    document.getElementById("dropdownMenu").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches('.dropdown-icon')) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

 
  return (
    <div className='container'>
      <div className='navbar'>
        <div className='left'>Apple Computers</div>
        <div className='right'>
          <img src={icon} alt="menu" className="dropdown-icon" onClick={toggleDropdown} />
          <div id="dropdownMenu" className="dropdown-content">
          <Link to="/generate-hallticket">
           <button>Generate HallTicket</button>
         </Link>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h1>Admission Form</h1>
        <form id="hallticketForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID:</label>
            <input type="text" id="studentId" name="studentId" required  value={studentId}
        onChange={(e) => setStudentId(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Student Name:</label>
            <input type="text" id="name" name="name" required value={name}
        onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="fatherName">Father's Name:</label>
            <input type="text" id="fatherName" name="fatherName" required  value={fatherName}
        onChange={(e) => setFatherName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <input type="text" id="course" name="course" required value={course}
        onChange={(e) => setCourse(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo:</label>
            <input type="file" id="photo" name="photo" accept="image/*"   onChange={(e) => setPhoto(e.target.files[0])}/>
          </div>
          <button type="submit">Submit Admission</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
