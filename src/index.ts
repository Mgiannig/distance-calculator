import express, { Request, Response } from 'express';
require("dotenv").config();
import { BranchOffice } from './model/branch-office';
import path from 'path';
import reader from 'xlsx';
import { getPersonList } from './persons-list';
import { Person } from './model/person';
import { DistanceMatrixApiResponse } from './model/distance-matrix-api-response';
import { BranchInfo, ServiceResponse } from './model/service-response';
import { getDistance } from './googleApi';
import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
var _ = require('lodash');

const port = process.env.PORT || 3000;
const app = express();
app.get("/excel", async (req: Request, res: Response) => {
    const branches: BranchOffice[] = getBranchesFromFile()
    const persons: Person[] = getPersonList();
    const maxDistance: number = parseInt(req.query.maxDistance as string) || 6000;

    const response: ServiceResponse[] = [];
    try {
        for (const person of persons) {
            //for each person, we show the available branches given the max distance that we pass on parameter.
            const availableBranches: BranchInfo[] = [];
            for (const branch of branches) {
                //this is a experimental solution in order to reduce the api calls. More info on readme
                const includeBranch = shouldIncludeBranch(person.location, { lat: branch.latitude, lng: branch.longitude });
                if (includeBranch) {
                    const distance: DistanceMatrixApiResponse = await getDistance(person.location, { lat: branch.latitude, lng: branch.longitude });
                    //the info that we need is deeply nester within the google api response. If it exceeds the max distance, we don't add it to the available branches array.
                    if (distance.rows[0].elements[0].distance.value < maxDistance) {
                        const branchInfo: BranchInfo = {
                            branchLocation: distance.destination_addresses,
                            distance: distance.rows[0].elements[0].distance.text,
                            meters: distance.rows[0].elements[0].distance.value
                        }
                        availableBranches.push(branchInfo)
                    }
                }
            }

            const userInfo: ServiceResponse = {
                name: person.name,
                id: person.id,
                availableBranches: _.sortBy(availableBranches, [function (b: BranchInfo) { return b.meters; }])

            };

            response.push(userInfo);
        }
    } catch (error) {
        res.send(`Encountered Error, please try again later ${error}`);
    }
    res.send(response);
})

app.listen(port, (): void => {
    console.log("Running in ", port);
})

function getBranchesFromFile(): BranchOffice[] {
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

function shouldIncludeBranch(personCoordinates: LatLngLiteral, branchCoordinates: LatLngLiteral): boolean {
    const latDifference = Math.abs(personCoordinates.lat - branchCoordinates.lat)
    const lngDiff = Math.abs(personCoordinates.lng - branchCoordinates.lng)
    return latDifference < 0.05 && lngDiff < 0.05;
}

