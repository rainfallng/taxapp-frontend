import { Outlet } from 'react-router-dom'
import Protected from './protected'

const DashboardLayout = () => {
  return (
    <Protected>
      <Outlet />
    </Protected>
  )
}

export default DashboardLayout
