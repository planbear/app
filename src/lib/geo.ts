import Geolocation from 'react-native-geolocation-service'

import { LocationInput } from '../graphql/types'

class Geo {
  location(): Promise<LocationInput> {
    Geolocation.requestAuthorization()

    return new Promise((resolve, reject) =>
      Geolocation.getCurrentPosition(
        position => {
          const {
            coords: { latitude, longitude }
          } = position

          resolve({
            latitude,
            longitude
          })
        },
        error => {
          reject(error)
        },
        {
          enableHighAccuracy: true
        }
      )
    )
  }

  distance(distance: number) {
    if (distance > 1000) {
      return `${Math.round(distance / 1000)}km`
    }

    return `${distance}m`
  }
}

export default new Geo()
