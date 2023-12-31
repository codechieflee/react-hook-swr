import Button from '../components/button'
import fetch from '../libs/fetch'
import { login, logout } from '../libs/auth'

import useSWR from 'swr'

export default function Index() {
  const { data, mutate } = useSWR('/api/user', fetch)

  if (!data) return <h1>loading...</h1>
  if (data.loggedIn) {
    return <div>
      <h1>Welcome, {data.name}</h1>
      <img src={data.avatar} width={80} />
      <Button onClick={() => {
        logout()
        mutate() // after logging in/out, we mutate the SWR
      }}>Logout</Button>
    </div>
  } else {
    return <div>
      <h1>Please login</h1>
      <Button onClick={() => {
        login()
        mutate()
      }}>Login</Button>
    </div>
  }
}

