import { getDistanceFromLatLonInMeters } from "./distanceCalculator";
import { getBranchesFromFile } from "./excelReader";
import { getDistance } from "./googleApi";
import { BranchOffice } from "./model/branch-office";
import { DistanceMatrixApiResponse } from "./model/distance-matrix-api-response";
import { Person } from "./model/person";
import { BranchInfo, ServiceResponse } from "./model/service-response";
var _ = require("lodash");

export async function execute(
  persons: Person[],
  maxDistance: number
): Promise<ServiceResponse[]> {
  const branches: BranchOffice[] = getBranchesFromFile();
  const response: ServiceResponse[] = [];
  for (const person of persons) {
    const availableBranches: BranchInfo[] = [];
    for (const branch of branches) {
      if (shouldIncludeBranch(person, branch, maxDistance)) {
        const branchInfo = await getBranchInfo(person, branch);
        availableBranches.push(branchInfo);
      }
    }

    const userInfo: ServiceResponse = {
      name: person.name,
      id: person.id,
      availableBranches: _.sortBy(availableBranches, [
        function (b: BranchInfo) {
          return b.meters;
        },
      ]),
    };

    response.push(userInfo);
  }

  return response;
}

function shouldIncludeBranch(
  person: Person,
  branch: BranchOffice,
  maxDistance: number
): boolean {
  return (
    getDistanceFromLatLonInMeters(
      person.location.lat,
      person.location.lng,
      branch.latitude,
      branch.longitude
    ) < maxDistance
  );
}

async function getBranchInfo(
  person: Person,
  branch: BranchOffice
): Promise<BranchInfo> {
  const distance: DistanceMatrixApiResponse = await getDistance(
    person.location,
    { lat: branch.latitude, lng: branch.longitude }
  );
  //the info that we need is deeply nester within the google api response. If it exceeds the max distance, we don't add it to the available branches array.
  const branchInfo: BranchInfo = {
    branchLocation: distance.destination_addresses,
    distance: distance.rows[0].elements[0].distance.text,
    meters: distance.rows[0].elements[0].distance.value,
  };

  return branchInfo;
}
