import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

  export default function Venue() {
    const [venues, setVenues] = useState([]);
  
    useEffect(() => {
      const fetchVenues = async () => {
        try {
          let token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:8000/venues/venue', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setVenues(response.data.venues);
        } catch (error) {
          console.error(' error users:', error);
        }
      };
  
      fetchVenues();
    }, []);
  
  
  
  
  return (<>
 <h1 className='p-7 text-3xl font-bold text-center text-blue-600'>ร้านสถานบันเทิง</h1>
   <div className='flex flex-wrap justify-around'>
    
   {venues.map((venue) => (
        <div key={venue.id} className='p-6 flex mx-auto flex-wrap justify-between'>
          <div className="card card-compact w-96 bg-base-100 shadow-xl mb-4">
            {/* <figure>
              <img src={venue.imageSrc} 
              alt={venue.title} />
            </figure> */}
            <div className="card-body">
              <h2 className="card-title">{venue.name}</h2>
              <h2 className="card-title">{venue.address}</h2>
              <p>{venue.phone}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" to="/table">เลือกร้าน</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>

</>
  );
}






  

 
