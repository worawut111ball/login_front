import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TableAll (props) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  

   return (
    <>
      <div className="p-9 flex flex-wrap gap-4">
        {tables.map((table) => (
          <div key={table.id} className="card w-5/6 bg-gray-300 shadow-xl mx-auto cursor-pointer">
            <div className="card-body rounded-lg hover:bg-blue-500">
              <div className="flex justify-between">
                <h2 className="card-title">id: {table.id}</h2>
                <h2 className="card-title">venueId: {table.venueId}</h2>
              
              </div>
              <p>seats: {table.seats}</p>
              <p>status: {table.status}</p>
              <p>tableNumber: {table.tableNumber}</p>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}