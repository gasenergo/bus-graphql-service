import faker from 'faker'

let buses = [
    {
        id:1,
        date:faker.date.recent().toLocaleDateString(),
        time:faker.random.number(),
        route: faker.address.city(),
        passengers:[
            {
                id:faker.random.number(),
                name:faker.name.findName(),
                phone:faker.phone.phoneNumber(),
                seatNum:faker.random.number(),
                busId:1,
            },
            {
                id:faker.random.number(),
                name:faker.name.findName(),
                phone:faker.phone.phoneNumber(),
                seatNum:faker.random.number(),
                busId:1,
            }
        ]
    },
    {
        id:2,
        date:faker.date.recent().toLocaleDateString(),
        time:faker.random.number(),
        route: faker.address.city(),
        passengers:[
            {
                id:faker.random.number(),
                name:faker.name.findName(),
                phone:faker.phone.phoneNumber(),
                seatNum:faker.random.number(),
                busId:2,
            },
            {
                id:faker.random.number(),
                name:faker.name.findName(),
                phone:faker.phone.phoneNumber(),
                seatNum:faker.random.number(),
                busId:2,
            }
        ]
    }
];
export default buses