/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalEdit(props) {
  const { el, closeModal, setTrigger } = props;
  const [input, setInput] = useState({
    name: "",
    address: "",
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
          const response = await axios.get('http://localhost:8000/admin/all-status', {
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
      name: el?.name || "",
      address: el?.address || "",
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
      await axios.put(`http://localhost:8000/admin/venue${el.id}`, input, {
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
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">ชื่อร้าน</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">ที่อยู่ร้าน</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="address"
              value={input.address}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">เบอร์โทรศัพท์</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="phone"
              value={input.phone}
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