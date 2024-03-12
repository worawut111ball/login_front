// TableSelection.js

import { Link } from 'react-router-dom';
import { useState } from 'react';

const Table = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelect = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  const tables = [
    { number: 1, capacity: 4,  },
    { number: 2, capacity: 6, },
    { number: 3, capacity: 2, },
    { number: 4, capacity: 2,  },
    { number: 5, capacity: 2,  },
    { number: 6, capacity: 2,  },
    { number: 7, capacity: 2,  },
    { number: 8, capacity: 2,  },
    { number: 9, capacity: 2,  },
    { number: 10, capacity: 2,  },
   
    // เพิ่มโต๊ะตามต้องการ
  ];

  return (
    <div className="container mx-auto p-8">
        
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-8'>เลือกโต๊ะ</h1>
      <form className=" md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto rounded-lg bg-gray-50/95 shadow-md p-4 ">

      <div className='p-4 flex flex-wrap justify-between'>
        {tables.map((table) => (
          <Link to="/reservation" 
            key={table.number}
            onClick={() => handleTableSelect(table.number)}
            className={`card w-40 bg-green-700 shadow-xl mb-24  text-center   ${
              selectedTable === table.number ? 'bg-green-700' : 'hover:bg-red-700'
            }`}
          >
            <p >โต๊ะที่ {table.number}</p>
            <p>ความจุ: {table.capacity} คน</p>
          </Link>
          
        ))}
        </div>
      </form>

    </div>
  );
};

export default Table;
