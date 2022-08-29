import { Person } from "./model/person";

const personList: Person[] =
    [
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
            name: "Juana - Quilmes",
            location: {
                lat: -34.7241800,
                lng: -58.2526500
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


export function getPersonList() {
    return personList;
}