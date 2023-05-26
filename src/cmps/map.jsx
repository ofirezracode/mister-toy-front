import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Button from '@mui/material/Button'

function Marker() {
  return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}

export default function Map() {
  const [center, setCenter] = useState({ lat: 32.794, lng: 34.9896 })
  const zoom = 10
  const branches = [
    {
      city: 'Haifa',
      id: 101,
      position: {
        lat: 32.794,
        lng: 34.9896,
      },
    },
    {
      city: 'Hadera',
      id: 102,
      position: {
        lat: 32.437408,
        lng: 34.925621,
      },
    },
    {
      city: 'Tel Aviv',
      id: 103,
      position: {
        lat: 32.0853,
        lng: 34.781769,
      },
    },
  ]

  return (
    <section className="map full">
      <div className="map-buttons">
        {branches.map((branch) => {
          return (
            <Button variant="contained" key={branch.city} onClick={() => setCenter(branch.position)}>
              {branch.city}
            </Button>
          )
        })}
      </div>
      <div style={{ height: '75vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCvoQoGY31Xw5Jq4aq2gr_2NVz2zvtIKFE' }}
          defaultCenter={center}
          center={center}
          defaultZoom={zoom}
        >
          {branches.map((branch) => {
            return <Marker lat={branch.position.lat} lng={branch.position.lng} key={branch.id} />
          })}
        </GoogleMapReact>
      </div>
    </section>
  )
}
