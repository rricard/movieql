/* @flow */

import type {Route} from '../reducer/navigationState';

export type PushRouteAction = {
  type: 'PUSH_ROUTE',
  payload: Route,
}

export const PUSH_ROUTE = 'PUSH_ROUTE';

export function pushRoute(route: Route): PushRouteAction {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export type PopRouteAction = {
  type: 'POP_ROUTE',
};

export const POP_ROUTE = 'POP_ROUTE';

export function popRoute(): PopRouteAction {
  return {
    type: POP_ROUTE,
  };
}

export function movieDetailRoute(id: string, title: string,) {
  return pushRoute({
    key: `MovieDetail:${id}:${Date.now()}`,
    view: 'MovieDetail',
    id,
    title,
  });
}

export function actorDetailRoute(id: string, name: string,) {
  return pushRoute({
    key: `ActorDetail:${id}:${Date.now()}`,
    view: 'ActorDetail',
    id,
    title: name,
  });
}
