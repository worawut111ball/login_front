import axios from "axios";
import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import ModalEdit from "../components/ModalEdit";

export default function Setvenue() {
  const [venues, setVenues] = useState([]);
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/admin/venue", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVenues(rs.data.venues);
    };
    run();
  }, [trigger]);

  const openModal = (id) => {
    let idx = venues.findIndex( el=> el.id === id)
    setEditIdx(idx)
    document.getElementById("my_modal_2").showModal()
  }

  const closeModal = () => {
    document.getElementById("my_modal_2").close()
  }

  return (
    
    <div className="p-12  border w-full md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-300  shadow-md flex flex-col gap-4">
      <div className="text-3xl mb-6 font-bold text-center text-blue-600">เเสดง,เเก้ไข,ลบ ข้อมูลร้าน</div>
      
      
      <ModalEdit el={venues[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
      <div className="flex flex-col gap-4 ">
        {venues.map((el) => (
          <VenueCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
        ))}
      </div>
      
    </div>
   
  );
}
