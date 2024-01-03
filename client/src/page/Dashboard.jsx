import React from 'react'
import { UserProvider, useUser } from '../context/UserContext'

export const Dashboard = () => {
  return (
    <UserProvider>
      <DashboardPage/>
    </UserProvider>
  )
}

export const DashboardPage = () => {
  const { user } = useUser()
  return (
    <>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    </>
  )
}