import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import MapView, { Region } from 'react-native-maps'

import { img_marker } from '../../assets'
import { LocationInput } from '../../graphql/types'
import { geo } from '../../lib'
import { layout } from '../../styles'

interface Props {
  style?: StyleProp<ViewStyle>

  onLocationChange: (location: LocationInput) => void
}

const latitudeDelta = 0.025
const longitudeDelta = 0.025

const LocationPicker: FunctionComponent<Props> = ({
  onLocationChange,
  style
}) => {
  const [region, setRegion] = useState<Region>()

  useEffect(() => {
    const fetch = async () => {
      const { latitude, longitude } = await geo.location()

      setRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      })
    }

    fetch()
  }, [])

  return (
    <View style={[styles.main, style]}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={({ latitude, longitude }) =>
          onLocationChange({
            latitude,
            longitude
          })
        }
      />
      <View style={styles.overlay}>
        <Image style={styles.marker} source={img_marker} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    borderRadius: layout.radius,
    overflow: 'hidden'
  },
  map: {
    height: 200
  },
  overlay: {
    left: '50%',
    marginLeft: -(70 / 3 / 2),
    marginTop: -(100 / 3),
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 100 / 3,
    width: 70 / 3
  }
})

export default LocationPicker
