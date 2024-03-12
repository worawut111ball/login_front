import axios from 'axios'
import {useState} from "react";



export default function RegisterForm() {
  const [input, setInput] = useState({
    name : '',
    username : '', 
    password : '',
    confirmPassword : '',
    email : '',
    phone : ''
  })


  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
  
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8000/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
       
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className='p-12 flex flex-col min-w-[600px] min-h-[900px] bg-[url("./images/bg.png")] bg-contain  justify-between'>
    <div className="p-10 border w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-lg mt-10  bg-gray-50/95">
    <div className="text-3xl mb-6 font-bold text-center text-blue-600">สมัครสมาชิก</div>
  
    <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>


    

      <span className="text-sm font-semibold text-gray-600 mb-1">ชื่อ-นามสกุล</span>
      <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
      <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
      <path  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
       <input type="text" 
          id="username" 
          className="grow"
          name="name"
          placeholder=" | name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>


      <span className="text-sm font-semibold text-gray-600 mb-1">ชื่อผู้ใช้</span>
      <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input 
         type="text" 
         id="username" 
          className="grow" 
          name="username" 
          placeholder=" | username"
          onChange={hdlChange}  
          value={input.username}
           />
         </label>


      <span className="text-sm font-semibold text-gray-600 mb-1">รหัสผ่าน</span>
      <label  className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input
          type="password"
          className="grow"
          name="password"
          placeholder=" | password"
          value={input.password}
          onChange={hdlChange}
        />
      </label>
  

      <span className="text-sm font-semibold text-gray-600 mb-1">ยืนยันรหัสผ่าน</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input
          type="password"
          className="grow"
          name="confirmPassword"
          placeholder=" | confirm password"
          value={input.confirmPassword}
          onChange={hdlChange}
        />
      </label>
  

      <span className="text-sm font-semibold text-gray-600 mb-1">อีเมล</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input
          type="email"
          className="grow"
          name="email"
          placeholder=" | email"
          value={input.email}
          onChange={hdlChange}
        />
      </label>
  

      <span className="text-sm font-semibold text-gray-600 mb-1">เบอร์โทรศัพท์</span>
      <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
        <input
          type="text"
          className="grow"
          name="phone"
          placeholder="  phone"
          value={input.phone}
          onChange={hdlChange}
        />
      </label>
  
      <div className="flex gap-10 px-6 mt-7 py-2 rounded-full mx-auto  ">
        <button type="submit" className="btn btn-info hover:bg-blue-700 text-sm font-semibold text-gray-600 mb-1">
           ยืนยัน 
        </button>
        
      </div>
      
    </form>
    
  </div>
  </div>
  
  );
}
