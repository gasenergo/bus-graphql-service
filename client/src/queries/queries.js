import { gql } from 'apollo-boost';

const getBusesQuery = gql`
    query GetBuses($date:String!){
        buses(date:$date) {
            id
            route
            date
            time
            description
        }
    }
`;
const getBusQuery = gql`
    query GetBus($id: ID){
        bus(id: $id) {
            id
            route
            date
            time
            vehicle
            passengers {
                id
                name
                phone
                seatNum
            }
        }
    }
`;

const addPassengerMutation = gql`
    mutation AddPassenger($name: String!, $phone: Int!, $seatNum: Int!, $busId: ID!){
        addPassenger(name: $name, phone: $phone, seatNum: $seatNum, busId: $busId){
            name
            id
        }
    }
`;


export { getBusQuery, getBusesQuery, addPassengerMutation };
