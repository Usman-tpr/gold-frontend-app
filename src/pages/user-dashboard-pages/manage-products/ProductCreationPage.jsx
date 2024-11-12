import React from 'react'
import UserDashboardLayout from '../../../layout/UserDashboardLayout'
import ProductCreationForm from '../../../components/user-dashboard-components/manage-products-components/ProductCreationForm'

export default function ProductCreationPage() {
  return (
    <UserDashboardLayout>
        <ProductCreationForm />
    </UserDashboardLayout>
  )
}
