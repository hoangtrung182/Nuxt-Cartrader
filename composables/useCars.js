import { cars } from '@/data/cars.json';
import makes from '@/data/makes.json';
import listing from '@/data/listing.json';

export const useCars = () => {
    return {
        cars, makes,
        listing
    }
}