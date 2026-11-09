import React from 'react';
import styles from './Test.module.scss';

const statuses = {
  interview: 'Собеседование',
  noResponse: 'Нет ответа',
  declined: 'Отказано',
};

const data = [
  { title: 'Frontend developer', salary: 'от 50 000 руб', views: 6, responses: 8, status: 'interview' },
  { title: 'Frontend developer', salary: 'от 50 000 руб', views: 6, responses: 8, status: 'noResponse' },
  { title: 'Frontend developer', salary: 'от 50 000 руб', views: 6, responses: 8, status: 'declined' },
];

const Test = () => {
  return (
    <div className={styles.vacancies}>
      <h2 className={styles.title}>Your vacancies</h2>
      <div className={styles.table}>
        <div className={styles.header}>
          <p className={styles.cell}>Название вакансии</p>
          <p className={styles.cell}>Начальная ставка</p>
          <p className={styles.cell}>Количество просмотров</p>
          <p className={styles.cell}>Количество откликов</p>
          <p className={styles.cell}>Статус вакансии</p>
        </div>

        {data.map((item, index) => (
          <div key={index} className={styles.row}>
            <p className={styles.cell}>{item.title}</p>
            <p className={styles.cell}>{item.salary}</p>
            <p className={styles.cell}>{item.views}</p>
            <p className={styles.cell}>{item.responses}</p>
            <div className={`${styles.statusBtn} ${styles[item.status]}`}>
              {statuses[item.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
