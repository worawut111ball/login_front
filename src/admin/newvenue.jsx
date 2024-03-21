/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import Setvenue from "../admin/setvenue";

export default function Newvenue() {
  
  const [input, setInput] = useState({
    name: "",
    address: "",
    phone: "",
    imageSrc: "",
  });
  

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!input.name || !input.address || !input.phone || !input.imageSrc) {
        alert("กรอกข้อมูลให้ครบ");
        return;
      }
      const token = localStorage.getItem("token");
      const rs = await axios.post("http://localhost:8000/admin/venue", input, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
    
      
      alert("Create new OK");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
return (  <>
    <div className="p-10 border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300 shadow-md">
    
    <div className="text-3xl mb-6 font-bold text-center text-blue-600">เพิ่มร้าน</div>
    <div className="p-12  border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300/100 shadow-md">
      <form onSubmit={hdlSubmit}>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ชื่อร้าน</span>
          </div>
          <input
            type="text"
            placeholder="กรอกชื่อร้าน"
            className="input input-bordered w-full "
            name="name"
            value={input.name}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">ที่อยู่ร้าน</span>
          </div>
          <input
            type="text"
            placeholder="กรอกที่อยู่ร้าน"
            className="input input-bordered w-full "
            name="address"
            value={input.address}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">เบอร์โทรศัพท์</span>
          </div>
          <input
            type="text"
            placeholder="กรอกเบอร์โทรศัพท์"
            className="input input-bordered w-full "
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">รูปร้าน</span>
          </div>
          <input
            type="text"
            accept=".jpg,.jpeg,.png"
            placeholder="กรอกที่อยู่รูปภาพ .jpg"
            className="input input-bordered w-full "
            name="imageSrc"
            value={input.imageSrc}
            onChange={hdlChange}
          />
        </label>
        <br />
        <div>
          
          <button className="btn px-4 btn-info hover:bg-blue-700 text-sm font-semibold text-gray-600 mb-1">เพิ่มร้าน</button>
        </div>
      </form>

     
    </div> 
    
    
    </div>
    <div><Setvenue/></div>
   </>
  );
}
