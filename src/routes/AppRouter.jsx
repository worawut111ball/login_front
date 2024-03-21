import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import Venue from '../layout/Venue'
import Table from '../layout/Table'
import Reservation from '../layout/Reservation'
import Footer from '../layout/Footer'
import Adminmenu from '../admin/adminmenu'
import Newvenue from '../admin/newvenue'
import Setvenue from '../admin/setvenue'
import Iduser from '../admin/iduser'
import TableAdmin from '../admin/table'
import Servation from '../admin/reservation'



const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      {/* <Outlet /> */}
      <Footer/>
    </>,
    children : [
      { index: true, element: <Venue /> },
      { path: '/venue', element: <Venue />},
      { path: '/table', element: <Table />},
      { path: '/reservation', element: <Reservation />},
      
      
    ]
  }
])
const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Adminmenu />
      {/* <Outlet /> */}
      <Footer/>
      
      </>,
    children: [
      { index: true, element: <Newvenue /> },
      { path: '/newvenue', element: <Newvenue /> },
      { path: '/reservation', element: <Servation /> },
      { path: '/setvenue', element: <Setvenue /> },
      { path: '/iduser', element: <Iduser /> },
      { path: '/tableadmin', element: <TableAdmin /> },
     

   
    ]
  }
])

export default function AppRouter() {
  const { user } = useAuth()
  const finalRouter = !user?.id ? guestRouter : user.role === 'ADMIN' ? adminRouter : userRouter
  return (
    <>
      <RouterProvider router={finalRouter} />
    </>
  )
}