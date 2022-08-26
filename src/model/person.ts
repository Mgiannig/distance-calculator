import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

export interface Person {
    id: number,
    name: string,
    location: LatLngLiteral
}