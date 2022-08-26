export interface DistanceMatrixApiResponse {
    destination_addresses: string;
    origin_addresses: string;
    rows: ApiResponseRow[]
}

export interface ApiResponseRow {
    elements: ApiResponseElement[]
}


interface ApiResponseElement {
    distance: Distance
}

interface Distance {
    text: string;
    value: number;
}