import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {

    const [selectedLocation, setSlectedLocation] = useState({});


    const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL
            width="100%"
            height="100%"
            mapStyle='mapbox://styles/chalana95/cksznw3s87xi318o2hm6xfaz1'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewPort) => { setViewport(nextViewPort) }}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        latitude={result.lat}
                        longitude={result.long}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p role="img" onClick={() => setSlectedLocation(result)} className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">📌</p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSlectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
