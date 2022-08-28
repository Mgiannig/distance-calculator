import { Person } from "./model/person";

export function getPersonList(): Person[] {
    return [
        {
            id: 1,
            name: "Nicolas - Caba",
            location: {
                lat: -34.596454,
                lng: -58.40896
            }
        },
        {
            id: 2,
            name: "Juana - Bernal",
            location: {
                lat: -34.7,
                lng: -58.2833333
            }
        },
        {
            id: 3,
            name: "Charly",
            location: {
                lat: -34.6507,
                lng: -58.622
            }
        },
    ]
}