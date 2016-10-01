/* @flow */

import { NavigationExperimental } from 'react-native';

import {
  PUSH_ROUTE,
  POP_ROUTE,
  SET_ROOT_ROUTE,
} from '../actions';

import type {
  PushRouteAction,
  PopRouteAction,
  SetRootRouteAction,
} from '../actions';

export type RouteView = 'MovieList'|'ActorList'|'MovieDetail'|'ActorDetail';

type Route = {
  key: string,
  view: RouteView,
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
  routes: [{key: 'MovieList', view: 'MovieList', title: 'Movies'}],
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
    case SET_ROOT_ROUTE: {
      const setRootRouteAction: SetRootRouteAction = action;
      return {
        index: 0,
        routes: [setRootRouteAction.payload],
      };
    }
    default: return state;
  }
};
