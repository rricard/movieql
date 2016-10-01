/* @flow */

import { NavigationExperimental } from 'react-native';

import {
  PUSH_ROUTE,
  POP_ROUTE,
} from '../actions';

import type {
  PushRouteAction,
  PopRouteAction,
} from '../actions';

export type RouteKey = 'MovieList'|'ActorList'|'MovieDetail'|'ActorDetail';

type Route = {
  key: RouteKey,
  title?: string,
  id?: string,
}

export type NavigationState = {
  index: number,
  routes: Array<Route>,
};

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  title: 'Movies',
  routes: [{key: 'MovieList'}],
};

export const navigationState = (
  state: NavigationState = initialState,
  action: PushRouteAction|PopRouteAction,
): NavigationState => {
  switch (action.type) {
    case PUSH_ROUTE: {
      const pushRouteAction: PushRouteAction = action;
      return NavigationStateUtils.push(state, pushRouteAction.payload);
    }
    case POP_ROUTE: {
      return NavigationStateUtils.pop(state);
    }
    default: return state;
  }
};
