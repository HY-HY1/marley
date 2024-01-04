import React from 'react'
import { UserProvider, useUser } from '../context/UserContext'
import { Button } from '../component/Button'
import { Orders } from '../component/Orders'

export const Dashboard = () => {
  return (
    <UserProvider>
      <DashboardPage/>
    </UserProvider>
  )
}

export const DashboardPage = () => {
  const { user, logout } = useUser()
  return (
    <>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
      <Button
      text='Log Out'
      size='m'
      variant='danger'
      onClick={logout}
      link='/'
      />
      <Orders/>
    </>
  )
}