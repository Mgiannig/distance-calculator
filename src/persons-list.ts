import { Person } from "./model/person";

export function getPersonList(): Person[] {
    return [
        {
            id: 1,
            name: "Nicolas",
            location: {
                lat: -34.596454,
                lng: -58.40896
            }
        },
        {
            id: 2,
            name: "Juana",
            location: {
                lat: 222,
                lng: 222
            }
        },
        {
            id: 3,
            name: "Charly",
            location: {
                lat: 456,
                lng: 654
            }
        },
        {
            id: 4,
            name: "Michael",
            location: {
                lat: 123,
                lng: 123
            }
        },
        {
            id: 5,
            name: "Ana",
            location: {
                lat: 123,
                lng: 123
            }
        }
    ]
}