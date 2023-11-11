export default async (city, filters) => {
    const { data, error } = await useFetch(`/api/cars/${city}`, {
        params: {
            ...filters
        }
    });

    if(error.value) {
        throw createError({
            statusCode: error.value.statusCode,
            statusMessage: error.value.statusMessage
        })
    };


    return { data}
}