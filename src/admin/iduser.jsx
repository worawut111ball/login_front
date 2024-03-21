import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalEditUser from "../components/ModalEditUser"
import IdCard from "../components/idCard"


export default function Iduser() {
  const [users, setUsers] = useState([]);
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/admin/id-all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [trigger]);

  const openModal = (id) => {
    let idx = users.findIndex( el=> el.id === id)
    setEditIdx(idx)
    document.getElementById("my_modal_2").showModal()
  }

  const closeModal = () => {
    document.getElementById("my_modal_2").close()
  }

  return (
    
    <div className="p-12  border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300  shadow-md flex flex-col gap-4">
      <div className="text-3xl mb-6 font-bold text-center text-blue-600">เเสดง,เเก้ไข,ลบ ข้อมูลID</div>
      
      
      <ModalEditUser el={users[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
      <div className="flex flex-col gap-4 ">
        {users.map((el) => (
          <IdCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
        ))}
      </div>
      
    </div>
   
  );
}
