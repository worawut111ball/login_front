import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Adminuser(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/admin/id-all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error(' error users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
  
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/admin/id${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Delete successful');
      // You may want to fetch users again or update the state accordingly
    } catch (err) {
      console.error('Error deleting user:',err);
    }
  };

   return (
    <>
      <div className="p-9 flex flex-wrap gap-4">
        {users.map((user) => (
          <div key={user.id} className="card w-5/6 bg-gray-300 shadow-xl mx-auto cursor-pointer">
            <div className="card-body rounded-lg hover:bg-blue-500">
              <div className="flex justify-between">
                <h2 className="card-title">Name: {user.name}</h2>
                {/* <div className="badge badge-secondary" onClick={() => handleDelete(user.id)}>
                  Delete
                </div> */}
              </div>
              <p>Username: {user.username}</p>
              <p>Password: {user.password}</p>
              <p>Email: {user.email ? user.email : 'No email provided'}</p>
              <p>Phone: {user.phone ? user.phone : 'No Phone provided'}</p>
              <p>Role: {user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}