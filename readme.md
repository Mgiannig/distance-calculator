

## Intro
For this exercise, I went over the Burger King branches provided in a file and, given an invented list of users, I return the closest branches for each user. The API used was the Google Distance Matrix API.

### Assumptions

I assume that the candidates are going to travel by public transportation (bus), so I passed said parameter to the google API.


## Parameters

```
maxDistance: number
```

The maximum distance in meters that the service will consider for its users.
Default 5000 meters

## Instruction

after downloading the project run npm install
you can call the service using the following URL, depending on your port.
.env file is used to store the private google API key.
http://localhost:3000/branches?maxDistance=3000

## Response

```
 {
        "name": "Nicolas",
        "id": 1,
        "availableBranches": [
            {
                "branchLocation": [
                    "Dr. Tomás Manuel de Anchorena 1353, C1425 CABA, Argentina"
                ],
                "distance": "0.5 km",
                "meters": 494
            },
            {
                "branchLocation": [
                    "Humahuaca 3400, C1191ABB CABA, Argentina"
                ],
                "distance": "1.0 km",
                "meters": 990
            },
            {
                "branchLocation": [
                    "Larrea 796, C1117 CABA, Argentina"
                ],
                "distance": "1.0 km",
                "meters": 1011
            },
            {
                "branchLocation": [
                    "C1114AAH, Pres. José Evaristo Uriburu 1166, C1114AAH CABA, Argentina"
                ],
                "distance": "1.9 km",
                "meters": 1899
            }
        ]
    },
    {
        "name": "Juana",
        "id": 2,
        "availableBranches": [
            {
                "branchLocation": [
                    "Quilmes, Gaboto 649, Quilmes, Provincia de Buenos Aires, Argentina"
                ],
                "distance": "1.4 km",
                "meters": 1383
            }
        ]
    },

```
