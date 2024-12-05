import React from 'react'
import UserDashboardLayout from '../../../layout/UserDashboardLayout'
import AllProducts from '../../../components/user-dashboard-components/manage-products-components/AllProducts'

export default function AllProductsPage() {
  return (
    <UserDashboardLayout>
        <AllProducts />
    </UserDashboardLayout>
  )
}
