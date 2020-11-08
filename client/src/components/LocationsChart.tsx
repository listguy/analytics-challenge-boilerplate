import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
import { GeoLocation } from "models";
import { httpClient } from "utils/asyncUtils";

const REACT_APP_GOOGLE_MAP_KEY: string = process.env.REACT_APP_GOOGLE_MAP_KEY!;

const LocationChart: React.FC = () => {
  const [data, setData] = useState<GeoLocation[]>([]);

  const fetchData = async () => {
    const { data }: { data: GeoLocation[] } = await httpClient.get(`/events/chart/geolocation`);

    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAP_KEY}>
        <GoogleMap
          center={{ lat: 20, lng: 20 }}
          zoom={3}
          mapContainerStyle={{ height: "80vh", width: "100%" }}
        >
          <MarkerClusterer averageCenter maxZoom={3} enableRetinaIcons>
            {(clusterer) =>
              data?.map((locationRes: GeoLocation, i: number) => (
                <Marker key={`marker${i}`} clusterer={clusterer} position={locationRes.location} />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default LocationChart;
