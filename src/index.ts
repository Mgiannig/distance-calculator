import express, { Request, Response } from 'express';
const app = express();
import { BranchOffice } from './model/branch-office';
import axios from 'axios';
import path from 'path';
import reader from 'xlsx';
import { getPersonList } from './persons-list';
import { Person } from './model/person';
import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { DistanceMatrixApiResponse } from './model/distance-matrix-api-response';
import { BranchInfo, ServiceResponse } from './model/service-response';
var _ = require('lodash');

const port = process.env.PORT || 3000;

app.get("/excel", async (req: Request, res: Response) => {
    const businesses: BranchOffice[] = getBusinessesFromFile()
    const persons: Person[] = getPersonList();
    const maxDistance: number = 12000;

    const response: ServiceResponse[] = [];
    for (const person of persons) {
        const availableBranches: BranchInfo[] = [];
        for (const business of businesses) {
            const destination: LatLngLiteral = {
                lat: business.latitude,
                lng: business.longitude
            }
            const distance: DistanceMatrixApiResponse = await getDistance(person.location, destination);
            if (distance.rows[0].elements[0].distance.value < maxDistance) {
                const branchInfo: BranchInfo = {
                    branchLocation: distance.destination_addresses,
                    distance: distance.rows[0].elements[0].distance.text,
                    meters: distance.rows[0].elements[0].distance.value
                }
                availableBranches.push(branchInfo)
            }
        }

        const userInfo: ServiceResponse = {
            maxDistanceInMeters: maxDistance,
            name: person.name,
            id: person.id,
            availableBranches: _.sortBy(availableBranches, [function (b: BranchInfo) { return b.meters; }])

        };

        response.push(userInfo);

    }

    res.send(response);
})

app.listen(port, (): void => {
    console.log("Running in ", port);
})

async function getDistance(origin: LatLngLiteral, destination: LatLngLiteral): Promise<DistanceMatrixApiResponse> {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=AIzaSyARrcDNt2Yks1eeSmPMNSRfJrQLnnaC81I`
    const response = await axios.get(url);
    return response.data;
}

function getBusinessesFromFile(): BranchOffice[] {
    const filePath = path.join(__dirname, '..', 'sucursales.xlsx')

    const file = reader.readFile(filePath);

    const data: BranchOffice[] = [];

    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res: any) => {
            data.push(res);
        })
    }

    return data;
}

