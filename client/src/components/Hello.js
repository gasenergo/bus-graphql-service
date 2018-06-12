import { Query } from "react-apollo";
import React from 'react';
import { getBusesQuery } from '../queries/queries';
const Hello = ({date}) => (
    <Query query={getBusesQuery} variables={{ date }}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.buses.map(({ route, time }) => (
                <div key={route}>
                <p>{`${route}: ${time}`}</p>
                </div>
            ));
        }}
    </Query>
  );
  export default Hello;