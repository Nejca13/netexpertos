'use client'
import L from 'leaflet'
import MarkerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import SimpleLoader from '@/components/Loaders/SimpleLoader'
import ExpertMapMarker from '@/components/ExpertMapMarker/ExpertMapMarker'
import ReactDOMServer from 'react-dom/server'

const MapComponent = ({ coord, destacados, setIsShowPopup }) => {
  return coord ? (
    typeof window !== undefined && (
      <MapContainer
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        center={coord}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={coord}
        >
          <Popup>Este eres tu!</Popup>
        </Marker>
        {destacados &&
          destacados.map((item, index) => (
            <Marker
              key={index}
              eventHandlers={{
                click: () =>
                  setIsShowPopup({
                    status: true,
                    profesional: item.profesional,
                  }),
              }}
              icon={
                new L.divIcon({
                  className: 'marker',
                  html: ReactDOMServer.renderToString(
                    <ExpertMapMarker profesional={item.profesional} />
                  ),
                })
              }
              position={[
                item.profesional.ubicacion.split(',')[0],
                item.profesional.ubicacion.split(',')[1],
              ]}
            ></Marker>
          ))}
      </MapContainer>
    )
  ) : (
    <SimpleLoader />
  )
}

export default MapComponent
