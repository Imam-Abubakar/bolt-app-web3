import { useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { UberContext } from '../context/uberContext'

const style = {
    wrapper: 'flex-1 h-full w-full overflow-x-hidden overflow-y-hidden',
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
    const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext)
    useEffect(() => {
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/sunnytcg/cl2zgxihk003414p69lgs82xe',
          center: [3.3244, 6.7000],
          zoom: 11,
        })
        if (pickupCoordinates) {
            addToMap(map, pickupCoordinates)
          }
      
          if (dropoffCoordinates) {
            addToMap(map, dropoffCoordinates)
          }
      
          if (pickupCoordinates && dropoffCoordinates) {
            map.fitBounds([dropoffCoordinates, pickupCoordinates], {
              padding: 1000,
              zoom: 13,
            })
          }
    }, [pickupCoordinates, dropoffCoordinates])

   
    const addToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }

    return <div className={style.wrapper} id='map' />
}

export default Map