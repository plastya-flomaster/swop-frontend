import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import MyItems from './MyItemsComponent';
import ItemCard from './ItemCardComponent';
import { IItem } from '../../utils/interface';
import Page404 from '../../Pages/404Page';

interface IItemRouter {
  items: IItem[];
  error: any;
}

const ItemRouter: React.FC<IItemRouter> = ({ items, error }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <MyItems items={items} error={error} />
      </Route>
      <Route path={`${path}/item/:id`} component={ItemCard} />
      <Route component={Page404} />
    </Switch>
  );
};
export default ItemRouter;
