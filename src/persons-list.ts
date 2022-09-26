import { Person } from "./model/person";

const personList: Person[] = [
  {
    id: 1,
    name: "Nicolas",
    location: {
      lat: -34.596454,
      lng: -58.40896,
    },
  },
  {
    id: 2,
    name: "Juana",
    location: {
      lat: -34.72418,
      lng: -58.25265,
    },
  },
  {
    id: 3,
    name: "Charly",
    location: {
      lat: -34.6507,
      lng: -58.622,
    },
  },
];

export function getPersonList(): Person[] {
  return personList;
}
