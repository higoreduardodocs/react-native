import { useContext } from 'react'

import { UserContext } from '../contexts/user-context'

export default function useUser() {
  return useContext(UserContext)
}
