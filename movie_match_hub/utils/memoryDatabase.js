// utils/memoryDatabase.js
const users = [];

export function addUser(user) {
    users.push(user);
}

export function findUser(email) {
    return users.find((user) => user.email === email);
}

export function verifyUser(email, password) {
    const user = findUser(email);
    return user && user.password === password;
}
