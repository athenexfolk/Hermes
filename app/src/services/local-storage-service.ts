export function getItemFromLocalStorage<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return null;
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(
            `Error parsing item from localStorage with key '${key}': ${error}`
        );
        return null;
    }
}

export function setItemToLocalStorage<T>(key: string, value: T) {
    try {
        const serializedValue =
            typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(
            `Error setting item in localStorage with key '${key}': ${error}`
        );
    }
}
