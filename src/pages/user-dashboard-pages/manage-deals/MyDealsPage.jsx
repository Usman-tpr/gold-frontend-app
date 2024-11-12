import React from 'react'
import UserDashboardLayout from '../../../layout/UserDashboardLayout'
import AllDeals from '../../../components/user-dashboard-components/manage-deals-components/AllDeals'

const MyDealsPage = () => {
  return (
    <UserDashboardLayout>
        <AllDeals />
    </UserDashboardLayout>
  )
}

export default MyDealsPage