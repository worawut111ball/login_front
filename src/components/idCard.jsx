import axios from "axios";
import React from "react";

export default function IdCard(props) {
  const { el, openModal, setTrigger } = props;

  const statusColor =
    el.status === "PENDING"
      ? "bg-pink-300"
      : el.status === "DOING"
      ? "bg-blue-300"
      : "bg-gray-300";

  const handleDelete = async (e) => {
    e.stopPropagation();

    // แสดง Alert สำหรับการยืนยันการลบ
    const isConfirmed = window.confirm(
      `คุณแน่ใจหรือไม่ที่ต้องการลบ ${el.name}?`
    );

    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/admin/iduser${el.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // อัพเดท state เพื่อรีเฟรชข้อมูล
        setTrigger((prev) => !prev);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={`card w-5/6 ${statusColor} shadow-xl mx-auto cursor-pointer active:shadow-none active:translate-x-2 active:translate-y-1`} onClick={() => openModal(el.id)}>
      <div className="card-body rounded-lg hover:bg-blue-500">
        <div className="flex justify-between">
          <h2 className="card-title">Name: {el.name}</h2>
          <div className="badge badge-secondary" onClick={handleDelete}>
            ลบข้อมูล
          </div>
        </div>
        <div className="flex">
          <p className="card-title">User: {el.username}</p>
          <p>Email: {el.email ? el.email : 'No email provided'}</p>
          <p>Phone: {el.phone ? el.phone : 'No Phone provided'}</p>
          <p className="text-right">Role: {el.role}</p>
        </div>
      </div>
    </div>
  );
  }  