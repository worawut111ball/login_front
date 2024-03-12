import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }


  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8000/auth/venues', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div className='p-12 flex flex-col min-w-[491px] min-h-[822px] bg-[url("./images/bg.png")] bg-contain  justify-between'>
    
    <div className= "p-10 border w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto rounded-lg mt-10 bg-gradient-to-r bg-gray-50/95 shadow-md">
  <div className="text-3xl mb-6 font-bold text-center text-blue-600">เข้าสู่ระบบ</div>

  <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>

    <div className="text-sm font-semibold text-gray-600 mb-1">
    ชื่อผู้ใช้
    <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
  <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
    <path  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
  <input 
  type="text" 
  id="username" 
  className="grow" 
  name="username" 
  placeholder=" | username"  
  value={input.username}
  onChange={hdlChange} />
</label>
</div>
  <div className="text-sm font-semibold text-gray-600 mb-1">
    รหัสผ่าน
    <label className="input input-bordered flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
  <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input 
  type="password"
  id="password"
   className="grow" 
   name="password"
   placeholder=" | passwoed" 
   value={input.password}
   onChange={hdlChange} />
</label>
</div>

    <div className="flex gap-10 px-6 mt-7 py-2 rounded-full mx-auto ">
    <button type="submit" className=" btn btn-success hover:bg-green-700 hover:text-white text-center py-3 px-6  font-semibold text-gray-600  " >
    เข้าสู่ระบบ
</button>

      <Link className='btn px-4 btn-info hover:bg-blue-700 text-sm font-semibold text-gray-600 mb-1' to="/register">สมัครสมาชิก</Link>
    </div>
  </form>
</div>
</div>

  );
}



