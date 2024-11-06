"use client";

import { useState } from "react";
import { updateCar } from "@/services/car"; 
import styles from "./UpdateCar.module.css"; // Import the CSS module

export default function UpdateCar() {
  const [id, setId] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Form data
    const carData = {
      id,
      model,
      color,
      year,
    };

    try {
      // Call the API to create a new car
      await updateCar(id,carData);

      // Reset form fields
      setId("");
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
      <h2 >Update a New Car</h2>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <div>
          <label  className={styles.lable}>Make:</label>
          <input
           className={styles.input}
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
        <button className={styles.button} type="submit">Update Car</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
