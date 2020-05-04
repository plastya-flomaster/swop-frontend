import React from 'react';
import '../utils/page404Styles.css';
import { Heading } from 'grommet';

const Page404: React.FC = () => {
  React.useEffect(() => {
    console.log('this is 404');
  }, []);

  return (
    <>
      <Heading>Ошибка 404</Heading>
      <p className="zoom-area">Такой страницы не существует!</p>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <p className="zoom-area">Вернитесь, пожалуйста, назад</p>
    </>
  );
};
export default Page404;
