import React, { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const resp = await fetch(
        "https://react-http-max-f7bf6-default-rtdb.firebaseio.com/meals.json"
      );
      if (!resp.ok) {
        throw new Error("Can not fetch data.");
      }
      const data = await resp.json();
      let niza = [];
      for (const key in data) {
        niza.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(niza);
      setIsLoading(false);
    };
    fetchMeals().catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, []);
  const mealsList = meals.map((meal, idx) => {
    return (
      <MealItem
        id={meal.id}
        key={idx}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });

  let content = <ul>{mealsList}</ul>;
  if (isLoading)
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
