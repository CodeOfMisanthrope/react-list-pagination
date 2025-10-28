import {type MouseEvent} from "react";
import {useState} from "react";
import styles from '~/app.module.css';
import data from '~/data.json';

export const App = () => {
    const [steps, _] = useState<typeof data>(data);
    const [activeIndex, setActiveIndex] = useState(0);

    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);

    const nextStep = () => {
        setActiveIndex((index) => {
            const newIndex = index + 1;
            updateStepFirstOrLast(newIndex);
            return newIndex;
        });
    };

    const prevStep = () => {
        setActiveIndex((index) => {
            const newIndex = index - 1;
            updateStepFirstOrLast(newIndex);
            return newIndex;
        });
    };

    const startStep = () => {
        setActiveIndex(0);
        setIsFirst(true);
        setIsLast(false);
    };

    const selectStep = (event: MouseEvent<HTMLButtonElement>) => {
        const id = Number(event.currentTarget.dataset.id);
        setActiveIndex(id);
        updateStepFirstOrLast(id);
    };

    const updateStepFirstOrLast = (id: number) => {
        if (id === 0) {
            setIsFirst(true);
            setIsLast(false);

        } else if (id === steps.length - 1) {
            setIsFirst(false);
            setIsLast(true);

        } else {
            setIsFirst(false);
            setIsLast(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps[activeIndex].content}
                    </div>
                    <ul className={styles['steps-list']}>
                        {steps.map((step, i) =>
                            (<li key={step.id} className={
                                styles['steps-item'] +
                                " " + (activeIndex - i >= 0 ? styles.done : "") +
                                " " + (i === activeIndex ? styles.active : "")
                            }>
                                <button onClick={selectStep} data-id={i} className={styles['steps-item-button']}>
                                    {i + 1}
                                </button>
                                Шаг {i + 1}
                            </li>)
                        )}
                    </ul>
                    <div className={styles['buttons-container']}>
                        <button className={styles.button} onClick={prevStep} disabled={isFirst}>Назад</button>
                        <button className={styles.button} onClick={isLast ? startStep : nextStep}>
                            {isLast ? 'Начать сначала' : 'Далее'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
