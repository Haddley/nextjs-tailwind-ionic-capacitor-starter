// https://blog.logrocket.com/integrating-google-maps-react/

import React from 'react'
import GoogleMapReact from 'google-map-react'
// import './map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

export const location = {
    address: 'Incident',
    // lat: 37.42216,
    // lng: -122.08427,
    lat: -45.0263779,
    lng: 168.6493445,
}

// @-45.0263779,168.6493445,13z

export const LocationPin = ({ text }) => (
    <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)


export const MapSection = () => (<div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={13}
    >
        <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
        />
    </GoogleMapReact>
</div>)


