import http from "./http";

// Service to fetch all cars
export const getAllCars = async () => {
    try {
        const response = await http.get("/car");
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
};

// Service to fetch a specific car by ID
export const getCarById = async (id:any) => {
    try {
        const response = await http.get(`/car/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching car with ID ${id}:`, error);
        throw error;
    }
};

// Service to create a new car
export const createCar = async (carData:any) => {
    try {
        const response = await http.post("/car", carData);
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
};

// Service to update a car by ID
export const updateCar = async (id:any, carData:any) => {
    try {
        const response = await http.patch(`/car/${id}`, carData);
        return response.data;
    } catch (error) {
        console.error(`Error updating car with ID ${id}:`, error);
        throw error;
    }
};

// Service to delete a car by ID
export const deleteCar = async (id:any) => {
    try {
        const response = await http.delete(`/car/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting car with ID ${id}:`, error);
        throw error;
    }
};