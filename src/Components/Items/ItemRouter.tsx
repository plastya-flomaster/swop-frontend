import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import MyItems from './MyItemsComponent';
import ItemCard from './ItemCardComponent';
import { IItem, ICategory } from '../../utils/interface';
import Page404 from '../../Pages/404Page';
import { AppState } from '../../redux/Stores/store';
import { connect } from 'react-redux';

interface IItemRouter {
  items: IItem[];
  error: any;
  categories: ICategory[];
}

const ItemRouter: React.FC<IItemRouter> = ({ items, error, categories }) => {
  const { path } = useRouteMatch();
  const [cats, setCats] = useState<ICategory[]>([]);

  useEffect(() => {
    setCats(categories);
  }, []);

  return (
    <Switch>
      <Route path={path} exact>
        <MyItems items={items} error={error} categories={cats} />
      </Route>
      <Route path={`${path}/item/:id`}>
        <ItemCard categories={cats} />
      </Route>
      <Route component={Page404} />
    </Switch>
  );
};
const mapStateToProps = (state: AppState) => ({
  categories: state.categories.categories,
});
export default connect(mapStateToProps)(ItemRouter);
