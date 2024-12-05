import React from 'react'
import UserDashboardLayout from '../../../layout/UserDashboardLayout'
import AllDeals from '../../../components/user-dashboard-components/manage-deals-components/AllDeals'

const MyDealsPage = () => {
  return (
    <UserDashboardLayout >
       <div className='mx-20'>
       <AllDeals />
       </div>
    </UserDashboardLayout>
  )
}

export default MyDealsPage