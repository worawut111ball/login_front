import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';


const guestNav = [
  { to : '/', text: 'เข้าสู่ระบบ' },
  { to : '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  // { to : '/', text: 'Home' },
]
export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-red-200">
      <div className="flex-1">

      <a className="btn btn-ghost text-xl font-bold">ระบบจองโต๊ะสถานบันเทิง</a>

        <a className="btn btn-ghost text-xl border  mx-auto rounded-md mt-5   font-semibold text-gray-700 ">
          <p className="bg-neutral text-neutral-content rounded-full w-16  ">
            <span className="text-xs">{user?.id ? user.username : 'UI'
            }</span></p >  {user?.id ? user.name : 'สวัสดีครับ'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link className="rounded-md shadow-md text-sm font-semibold text-gray-600 mb-1 " to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
          
           
             <div className="flex-none">
    <ul className="menu menu-horizontal px-1 rounded-md  text-sm font-semibold text-gray-600 mb-1">
      <li>
        <details> <summary className="rounded-md shadow-md"> เมนู </summary>
          <ul className="p-2 bg-base-100 rounded-t-none">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
            <li><a>Link 3</a></li>
            <li><a>Link 4</a></li>
           
          </ul>
        </details>
      </li>
      <li className="rounded-md  shadow-md text-sm font-semibold text-gray-600 mb-1 "><a><Link  to='#' onClick={hdlLogout}>ออกจากระบบ</Link></a></li>
    </ul>
  </div>
          ) }
        </ul>
      </div>
    </div>
  );
}
