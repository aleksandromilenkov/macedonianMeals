import React from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Filled Peppers",
    description: "Green peppers filled with mix of meat and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Musaka",
    description: "A Macedonian specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Sarma",
    description: "Rolled cabage filled with meat and veggies",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Tavce Gravce",
    description: "Beans on Macedonian way!",
    price: 8.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
