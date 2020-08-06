export const getLSItem = (key: string) => {
    return localStorage.getItem(key);
};

export const setLSItem = (key: string, value :  string) => {
    console.log(key, value)
    return localStorage.setItem(key, value);
};
