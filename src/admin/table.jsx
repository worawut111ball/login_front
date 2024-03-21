/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import TableAll  from "./tableAll";

// นิยาม Enum TABLESTATUS
const TABLESTATUS = {
  OFF: "OFF",
  OPEN: "OPEN"
};

export default function Table() {
  const [input, setInput] = useState({
    tableNumber: "",
    seats: "",
    status: TABLESTATUS.OPEN, // กำหนดค่าเริ่มต้นเป็น OPEN
    venueId: ""
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
  
      if (!input.tableNumber || !input.seats || !input.status || !input.venueId) {
        alert("กรอกข้อมูลให้ครบ");
        return;
      }
      const token = localStorage.getItem("token");
      const rs = await axios.post("http://localhost:8000/admin/table", {
        tableNumber: input.tableNumber,
        seats: parseInt(input.seats),
        status: input.status,
        venueId: parseInt(input.venueId)
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Create new OK");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="p-10 border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300 shadow-md">
        <div className="text-3xl mb-6 font-bold text-center text-blue-600">เพิ่มโต๊ะ</div>
        <div className="p-12  border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300/100 shadow-md">
          <form onSubmit={hdlSubmit}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">tableNumber</span>
              </div>
              <input
                type="number"
                placeholder="tableNumber"
                className="input input-bordered w-full "
                name="tableNumber"
                value={input.tableNumber}
                onChange={hdlChange}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">seats</span>
              </div>
              <input
                type="number"
                placeholder="seats"
                className="input input-bordered w-full "
                name="seats"
                value={input.seats}
                onChange={hdlChange}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">status</span>
              </div>
              <select
                className="input input-bordered w-full"
                name="status"
                value={input.status}
                onChange={hdlChange}
              >
                <option value={TABLESTATUS.OFF}>OFF</option>
                <option value={TABLESTATUS.OPEN}>OPEN</option>
              </select>
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">venueId</span>
              </div>
              <input
                type="number"
                placeholder="venueId"
                className="input input-bordered w-full "
                name="venueId"
                value={input.venueId}
                onChange={hdlChange}
              />
            </label>
            <br />
            <div>
              <button className="btn px-4 btn-info hover:bg-blue-700 text-sm font-semibold text-gray-600 mb-1">เพิ่มร้าน</button>
            </div>
          </form>
        </div> 
        <TableAll/>
      </div>
    </>
  );
}
