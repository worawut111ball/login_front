/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalEditUser(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    role: "",
    name: "",
    username: "",
    email: "",
    phone: ""
  });
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const allStatus = JSON.parse(localStorage.getItem('status'));
    if (allStatus) {
      setStatus(allStatus);
    } else {
      const run = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8000/admin/id-all', {
            headers: { Authorization: `Bearer ${token}` }
          });
          localStorage.setItem('status', JSON.stringify(response.data.status));
          setStatus(response.data.status);
        } catch (error) {
          console.error("Error fetching status:", error.message);
        }
      };
      run();
    }
  }, []);
  useEffect(() => {
    setInput({
        role: el?.role || "",
        name: el?.name || "",
        username: el?.username || "",
        email: el?.email || "",
        phone: el?.phone || ""
    });
  }, [el?.id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/admin/iduser${el.id}`, input, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating data:", error.message);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={handleSubmit}>
        <span className="text-sm font-semibold text-gray-600 mb-1">ชื่อ-นามสกุล</span>
      <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
      <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
      <path  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
       <input type="text" 
          id="username" 
          className="grow"
          name="name"
          placeholder=" | name"
          value={input.name}
          onChange={handleChange}
        />
      </label>
      <span className="text-sm font-semibold text-gray-600 mb-1">ชื่อผู้ใช้</span>
      <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input 
         type="text" 
         id="username" 
          className="grow" 
          name="username" 
          placeholder=" | username"
          onChange={handleChange}  
          value={input.username}
           />
         </label>
         <span className="text-sm font-semibold text-gray-600 mb-1">อีเมล</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input
          type="email"
          className="grow"
          name="email"
          placeholder=" | email"
          value={input.email}
          onChange={handleChange}
        />
      </label>
      <span className="text-sm font-semibold text-gray-600 mb-1">เบอร์โทรศัพท์</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
        <input
          type="text"
          className="grow"
          name="phone"
          placeholder="  phone"
          value={input.phone}
          onChange={handleChange}
        />
      </label>
      <span className="text-sm font-semibold text-gray-600 mb-1">Role</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
        <input
          type="role"
          className="grow"
          name="role"
          placeholder="  role"
          value={input.role}
          onChange={handleChange}
        />
      </label>
          <button type="submit" className="btn btn-primary">เเก้ไข</button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            ยกเลิก
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>ยกเลิก</button>
      </form>
    </dialog>
  );
}