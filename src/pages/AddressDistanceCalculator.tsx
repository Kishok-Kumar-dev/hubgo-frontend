import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message } from "antd";

const AddressDistanceCalculator: React.FC = () => {
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [distance, setDistance] = useState<string | null>(null);

    // Function to get coordinates for a given address
    const getCoordinates = async (address: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            const response = await axios.get("https://api.olamaps.io/places/v1/geocode", {
                params: {
                    address,
                    api_key: "tIs2LqWp0fl4yzOrORmeJcxy2y63Ya8ybWR3Yd4k", // Replace with your Ola Maps API Key
                },
            });

            if (response.data && response.data.geocodingResults) {
                const { lat, lng } = response.data.geocodingResults[0].geometry.location;
                return { lat, lng };
            }
        } catch (error) {
            console.error("Error fetching coordinates from Ola Maps:", error);
        }
        return null;
    };

    // Function to calculate route distance using Ola Maps Routing API
   // Function to calculate route distance using Ola Maps Routing API
   const calculateRouteDistance = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    try {
        const response = await axios.get("https://api.olamaps.io/routing/v1/directions/basic", {
            params: {
                origin: `${origin.lat},${origin.lng}`,
                destination: `${destination.lat},${destination.lng}`,
                mode: "driving",
                alternatives: false,
                steps: true,
                overview: "full",
                language: "en",
                traffic_metadata: false,
                api_key: "tIs2LqWp0fl4yzOrORmeJcxy2y63Ya8ybWR3Yd4k",
            },
            headers: {
                "Origin": "https://hubgo.netlify.app",
                "X-Request-Id": "UNIQUE_REQUEST_ID",
            },
        });
    
        if (response.data && response.data.routes && response.data.routes[0]) {
            const route = response.data.routes[0];
            const distance = route.legs[0].distance.text;
            return distance;
        } else {
            throw new Error("Route calculation failed.");
        }
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        message.error("Failed to calculate route distance. Please try again.");
    }
    
    return null;
};


    const handleCalculateDistance = async () => {
        if (!address1 || !address2) {
            message.warning("Please enter both addresses!");
            return;
        }

        const coord1 = await getCoordinates(address1);
        const coord2 = await getCoordinates(address2);

        if (coord1 && coord2) {
            const routeDistance = await calculateRouteDistance(coord1, coord2);
            if (routeDistance) {
                setDistance(`Route distance: ${routeDistance}`);
            } else {
                setDistance("Unable to calculate route. Please try again.");
            }
        } else {
            setDistance("Unable to fetch coordinates for one or both addresses.");
        }
    };

    return (
        <div>
            <h1>Address Distance Calculator</h1>
            <div>
                <Input
                    type="text"
                    placeholder="Enter Address 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter Address 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                />
                <Button onClick={handleCalculateDistance}>Calculate Distance</Button>
            </div>
            {distance && <p>{distance}</p>}
        </div>
    );
};

export default AddressDistanceCalculator;
