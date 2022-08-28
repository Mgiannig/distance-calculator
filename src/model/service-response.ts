export interface ServiceResponse {
    maxDistanceInMeters: number;
    name: string;
    id: number;
    availableBranches: BranchInfo[]
}

export interface BranchInfo {
    branchLocation: string;
    distance: string;
    meters: number;
}