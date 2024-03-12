import axios from "axios";
import {useEffect, useState } from "react";

const Reservation = () => {
  const [input, setInput] = useState({
    
    dateTime : new Date().toISOString().split('T')[0],
    
  });
  const [status, setStatus] = useState([])
  
  useEffect( ()=> {
    let allStatus = JSON.parse(localStorage.getItem('status'))
    if(allStatus) {
      return setStatus(allStatus)
    }
    const run = async () => {
      const token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8000/auth/reservation', {
        headers : { Authorization : `Bearer ${token}`}
      })
      localStorage.setItem('status', JSON.stringify(rs.data.status))
      setStatus(rs.data.status)
    }
    run()
  }, [] )
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const rs = await axios.post(
        "http://localhost:8000/auth/reservation",
        input
      );
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="p-10 border w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-lg mt-10  bg-gray-50/95">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-600">
        Table Reservation
      </h1>
      <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
        <span className="text-sm font-semibold text-gray-600 mb-1">
          ชื่อ-นามสกุล
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          
          <input
            type="text"
            id="userId"
            className="grow"
            name="userId"
            placeholder=" | userId"
            value={input.userId}
            onChange={hdlChange}
          />
        </label>
        

        <span className="text-sm font-semibold text-gray-600 mb-1">
          เลขโต๊ะ
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          
          <input
            type="text"
            id="tableId"
            className="grow"
            name="tableId"
            placeholder=" | tableId"
            value={input.tableId}
            onChange={hdlChange}
          />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
          ร้าน
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          <input
            type="text"
            id="venueId"
            className="grow"
            name="venueId"
            placeholder=" | venueId"
            value={input.venueId}
            onChange={hdlChange}
          />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
        เวลาจอง
        </span>
        <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          <input
           type="date" 
           id="dateTime"
            className="grow"
            name="dateTime"
           value={input.dateTime} 
           onChange={hdlChange} />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
          จำนวนที่นั่ง
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          <input
            type="number"
            id="username"
            className="grow"
            name="name"
            placeholder=" | tableId"
            value={input.numberCustomers}
            onChange={hdlChange}
          />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
          สถานะ
        </span>
        <select className="select select-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1"
            name = "status"
            value = {input.status}
            onChange={hdlChange}
          >
            { status.map( el => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>
        

        <button
          type="submit"
          className="btn btn-info hover:bg-blue-700 text-sm font-semibold text-gray-600 mb-1"
        >
            ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Reservation;
