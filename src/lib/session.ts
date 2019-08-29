import AsyncStorage from '@react-native-community/async-storage'

import { User } from '../graphql/types'

const { clear, getItem, setItem } = AsyncStorage

interface SessionProps {
  token: string
  user: User
}

class Session {
  session?: SessionProps

  async init() {
    const session = await getItem('@session')

    if (session) {
      this.session = JSON.parse(session) as SessionProps

      return this.session
    }
  }

  async put(session: SessionProps) {
    this.session = session

    await setItem('@session', JSON.stringify(session))
  }

  async clear() {
    this.session = undefined

    await clear()
  }

  get token() {
    if (this.session) {
      const { token } = this.session

      return token
    }

    return null
  }

  get userId() {
    if (this.session) {
      const {
        user: { id }
      } = this.session

      return id
    }

    return null
  }
}

export default new Session()
