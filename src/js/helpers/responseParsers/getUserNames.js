const getUserNames = (response) => (
    response.map((item) => item.login)
)

export default getUserNames;