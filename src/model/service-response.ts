export interface ServiceResponse {
    maxDistanceInMeters: number;
    name: string;
    id: number;
    availableBranches: BranchInfo[]
}

export interface BranchInfo {
    originAddress: string;
    branchLocation: string;
    distance: string;
    meters: number;
}