const apisConfig = {
    graphQlHost: process.env.REACT_APP_GRAPH_HOST || "http://localhost:4000/graphql",
    tokenName: process.env.TOKEN || "Spacenow"
};

export default apisConfig;
