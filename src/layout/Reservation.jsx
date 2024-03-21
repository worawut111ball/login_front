import axios from "axios";
import { useState } from "react";

// นิยาม Enum TABLESTATUS
const TABLESTATUS = {
  OFF: "OFF",
  OPEN: "OPEN"
};

export default function Reservation() {
  const [input, setInput] = useState({
    userId: "",
    tableId: "",
    venueId: "",
    dateTime: "",
    numberCustomers: "",
    status: TABLESTATUS.OPEN // กำหนดค่าเริ่มต้นเป็น OPEN
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!input.userId || !input.tableId || !input.venueId || !input.numberCustomers) {
        alert("กรอกข้อมูลให้ครบ");
        return;
      }
      const token = localStorage.getItem("token");
      const dateTime = new Date(input.dateTime).toISOString();
      const rs = await axios.post("http://localhost:8000/venues/reservation", {
        userId: parseInt(input.userId),
        tableId: parseInt(input.tableId),
        venueId: parseInt(input.venueId),
        dateTime: dateTime,
        numberCustomers: parseInt(input.numberCustomers),
        status: input.status,
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
    <div className="p-10 border w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-lg mt-10  bg-gray-50/95">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-600">
        Table Reservation
      </h1>
      <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
        <span className="text-sm font-semibold text-gray-600 mb-1">
        userId
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          
          <input
            type="number"
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
            type="number"
            id="tableId"
            className="grow"
            name="tableId"
            placeholder=" | โต๊ะที่"
            value={input.tableId}
            onChange={hdlChange}
          />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
       ร้าน
        </span>
        <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
          <input
            type="number"
            id="venueId"
            className="grow"
            name="venueId"
            placeholder=" | ร้านที่"
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
            id="numberCustomers"
            className="grow"
            name="numberCustomers"
            placeholder=" | tableId"
            value={input.numberCustomers}
            onChange={hdlChange}
          />
        </label>

        <span className="text-sm font-semibold text-gray-600 mb-1">
          สถานะ
        </span>
        <select
                className="input input-bordered w-full"
                name="status"
                value={input.status}
                onChange={hdlChange}
              >
                <option value={TABLESTATUS.OFF}>OFF</option>
                <option value={TABLESTATUS.OPEN}>OPEN</option>
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
}

