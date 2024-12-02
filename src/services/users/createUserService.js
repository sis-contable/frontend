const createUserService = async (newUser) => {
    try {
        const response = await fetch(`/api/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        if (response.ok) {
            return newUser;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

export default createUserService;