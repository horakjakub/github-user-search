const getUserNames = (response) => (
    response.items.map((item) => item.login)
);

export default getUserNames;