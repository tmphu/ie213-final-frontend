import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const [markerPosition, setMarkerPosition] = useState(null);
  const defaultProps = {
    center: {
      lat: 12.236791137320154,
      lng: 109.19776386226995
    },
    zoom: 11
  };
  
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_YOUR_GOOGLE_MAPS_API_KEY.toString() }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={12.236791137320154}
          lng={109.19776386226995}
          text="My Marker"
        />
        {markerPosition && (
          <AnyReactComponent lat={markerPosition.lat} lng={markerPosition.lng} text="My Marker" />
        )}
      </GoogleMapReact>
    </div>
  );
}