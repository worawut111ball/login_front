import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Servation (props) {
  const [reservations, setreservations] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/admin//reservation-all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setreservations(response.data.reservations);
      } catch (error) {
        console.error(' error users:', error);
      }
    };

    fetchUsers();
  }, []);

  

   return (
    <>
      <div className="p-9 flex flex-wrap gap-4">
        {reservations.map((reservations) => (
          <div key={reservations.id} className="card w-5/6 bg-gray-300 shadow-xl mx-auto cursor-pointer">
            <div className="card-body rounded-lg hover:bg-blue-500">
              <div className="flex justify-between">
                <h2 className="card-title">id: {reservations.id}</h2>
                <h2 className="card-title">userId: {reservations.userId}</h2>
              
              </div>
              <p>tableId: {reservations.tableId}</p>
              <p>venueId: {reservations.venueId}</p>
              <p>dateTime: {reservations.dateTime ? reservations.dateTime : 'No email provided'}</p>
              <p>numberCustomers: {reservations.numberCustomers ? reservations.numberCustomers : 'No Phone provided'}</p>
              <p>status: {reservations.status}</p>
              <p>createdAt: {reservations.createdAt}</p>
              <p>updatedAt: {reservations.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}