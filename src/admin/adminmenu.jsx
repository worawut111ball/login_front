import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const guestNav = [
    { to: "/", text: "เข้าสู่ระบบ" },
    { to: "/register", text: "สมัครสมาชิก" },
  ];
  
  const userNav = [
    { to: "/newvenue", text: "CRUD ร้าน" },
    { to: "/Iduser", text: "ID USER/ADMIN" },

    
   
  ];
export default function Adminmenu() {
    const { user, logout } = useAuth();
    const finalNav = user?.id ? userNav : guestNav;
  
    const navigate = useNavigate();

    const hdlLogout = () => {
        logout()
        navigate('/')
    }
    return (
       <div className=" navbar bg-gray-300 " >
      <a className="btn text-xl btn-ghost font-bold">ระบบจองโต๊ะสถานบันเทิง</a>
     
        <a className=" btn btn-ghost text-xl mx-auto  mt-4 font-semibold text-gray-700 ">
          <p className="bg-neutral text-neutral-content rounded-full w-16 ">
            <span className="text-xs ">{user?.id ? user.username : "UI"}</span>
          </p>{""}
          {user?.id ? user.name : "สวัสดีครับ"}
        </a>
     
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link
                className="rounded-md shadow-md mx-auto  text-sm font-semibold text-gray-600 mb-1 "
                to={el.to}
              >
                {el.text}
              </Link>
            </li>
          ))}
          {user?.id && (
            <li className="rounded-md  shadow-md text-sm font-semibold text-gray-600 mb-1 ">
              <a>
                <Link to="#" onClick={hdlLogout}>
                  ออกจากระบบ
                </Link>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
    )
}