'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Contact = () => {
  const position: [number, number] = [-6.2088, 106.8456]; // Jakarta coordinates

  return (
    <section id="contact" className="bg-secondary py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We'd love to hear from you. Here's how you can reach us.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold">Our Location</h3>
            <p className="text-muted-foreground">123 Pet Street, Jakarta, Indonesia</p>
            <h3 className="text-2xl font-bold">Opening Hours</h3>
            <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-muted-foreground">Sat: 10:00 AM - 4:00 PM</p>
          </div>
          <div className="h-96 w-full overflow-hidden rounded-lg">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Urban Animal Clinic
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
