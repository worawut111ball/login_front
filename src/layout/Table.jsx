import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



  export default function Table() {
    const [tables, setTables] = useState([]);
  
  
    useEffect(() => {
      const fetchTables = async () => {
        try {
          let token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:8000/venues/tableAll', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTables(response.data.tables);
        } catch (error) {
          console.error(' error users:', error);
        }
      };
  
      fetchTables();
    }, []);
  

  
  return (
    <div className="container mx-auto p-8">
        
      <span className='text-3xl font-bold text-center text-blue-600 mb-8'></span>
      <form className=" md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg bg-gray-50/95 shadow-md p-4 ">

      <div className='p-4 flex flex-wrap justify-between'>
        {tables.map((table) => (
          <Link to="/reservation" 
            key={table.tableNumber}
            onClick={() => table(table.tableNumber)}
            className={`card w-40 bg-green-700 shadow-xl mb-24  text-center   ${
              table === table.tableNumber ? 'bg-green-700' : 'hover:bg-red-700'
            }`}
          >
            <p className=' font-bold' >โต๊ะที่ {table.tableNumber}</p>
            <p className=' font-bold' >จำนวนที่นั่ง {table.seats}</p>
            
          </Link>
          
        ))}
        </div>
      </form>

    </div>
  );
}

