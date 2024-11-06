"use client";

import { useEffect, useState } from "react";
import { getAllCars, deleteCar } from "@/services/car"; // Import the delete function from your service
import styles from "./Home.module.css"; // Import the CSS module

export default function Home() {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const car = await getAllCars();
      console.log(car);
      const carData = Array.isArray(car) ? car : car.documents || [];
      setCars(carData);
    };

    fetchData();
  }, []);

  const handleDelete = async (carId: string) => {
    try {
      await deleteCar(carId); // Call the delete function
      // Update state to remove the deleted car
      setCars((prevCars) => prevCars.filter(car => car._id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className={styles.container}>
      {cars.map((car) => (
        <div key={car._id} className={styles.carCard}>
          <h2 className={styles.carTitle}>{car.color}</h2>
          <p className={styles.carModel}>{car.model}</p>
          <button 
            className={styles.deleteButton} 
            onClick={() => handleDelete(car._id)} // Call delete on button click
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
