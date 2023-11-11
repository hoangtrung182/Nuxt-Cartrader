import { cars } from '@/data/cars.json';


export default defineEventHandler((event) => {
    const { city = 'all' } = event.context.params;
    const { make, maxPrice, minPrice } = getQuery(event);

    let filteredCars = cars;


    filteredCars = filteredCars.filter(car => {
        return car.city.toLowerCase() === city.toLowerCase();
    })

    if(city === 'all') {
        return filteredCars = cars;
    }

    if(make) {
        filteredCars = filteredCars.filter(car => {
            return car.make.toLowerCase() === make.toLowerCase();
        })
    }

    if(minPrice) {
        filteredCars = filteredCars.filter(car => {
            return car.price >= parseInt(minPrice);
        })
    }
    if(maxPrice) {
        filteredCars = filteredCars.filter(car => {
            return car.price <= parseInt(maxPrice);
        })
    }
    return filteredCars;
})