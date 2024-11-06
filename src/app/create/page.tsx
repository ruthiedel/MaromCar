"use client";

import { useState } from "react";
import { createCar } from "@/services/car"; 
import styles from "./CreateCar.module.css"; // Import the CSS module

export default function CreateCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Form data
    const carData = {
      make,
      model,
      color,
      year,
    };

    try {
      // Call the API to create a new car
      await createCar(carData);
      setMessage("Car added successfully!");

      // Reset form fields
      setMake("");
      setModel("");
      setColor("");
      setYear("");
    } catch (error) {
      console.error("Error adding car:", error);
      setMessage("Failed to add car.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 >Add a New Car</h2>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <div>
          <label  className={styles.lable}>Make:</label>
          <input
           className={styles.input}
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.lable}>Model:</label>
          <input
           className={styles.input}
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.lable}>Color:</label>
          <input
           className={styles.input}
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.lable}>Year:</label>
          <input
           className={styles.input}
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">Add Car</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
