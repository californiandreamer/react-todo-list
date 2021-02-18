import React, { useState, useEffect } from "react";
import s from "./App.module.css";
import "./App.css";

function App() {
    const initialData = JSON.parse(localStorage.getItem("tasks"));
    const [values, setValues] = useState("");
    const [tasksList, setTask] = useState(initialData || []);
    console.log(tasksList);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTask([
            ...tasksList,
            {
                id:
                    tasksList.length === 0
                        ? 0
                        : tasksList.indexOf(tasksList.slice(-1)[0]) + 1,
                task: values,
            },
        ]);
    };

    const saveDataToStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasksList));
    };

    const removeTask = (e, index) => {
        console.log(index);
        e.preventDefault();
        if (index > -1) {
            tasksList.splice(index, 1);
        }
        saveDataToStorage();
    };

    const mapped = tasksList.map((val) => {
        return (
            <div className={s.card} key={val.id}>
                <div className={s.card__inner}>
                    <div className={s.card__content}>
                        {val.id}. {val.task}
                    </div>
                    <button onClick={(e) => removeTask(e, val.id)}>-</button>
                </div>
            </div>
        );
    });

    useEffect(() => {
        saveDataToStorage();
    }, [tasksList]);

    return (
        <div className="App">
            <div className={s.form__row} onSubmit={handleSubmit}>
                <form className={s.form}>
                    <input
                        className={s.form__input}
                        type="text"
                        vlaue={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder="Input new task"
                    />
                    <button className={s.form__btn}>+</button>
                </form>
            </div>
            <div className="Cards-box">{mapped}</div>
        </div>
    );
}

export default App;
