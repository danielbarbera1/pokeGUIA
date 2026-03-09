export const safeFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            return { ok: false, error: `Error HTTP: ${response.status}` };
        }
        const data = await response.json();
        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: error.message };
    }
};
