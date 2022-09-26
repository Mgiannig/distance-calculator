import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import { DistanceMatrixApiResponse } from "./model/distance-matrix-api-response";

const apikey = process.env.GOOGLE_API_KEY;
//I check the real distance using google api. I assume that the person is using public transportation.
export async function getDistance(
  origin: LatLngLiteral,
  destination: LatLngLiteral
): Promise<DistanceMatrixApiResponse> {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=´${apikey}&mode=transit`;
  const response = await axios.get(url);
  return response.data;
}
