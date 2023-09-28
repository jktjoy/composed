import { AppError, Dataset, Frontend, Model, Pipeline, Solution } from './composer.interface';
import { createReducer, on } from '@ngrx/store';
import * as ComposerActions from './composer.actions';
import { Composer } from './composer.interface';

export interface ComposerState {
  id?: string;
  items: {
    solution?: Record<string, Solution>;
    model?: Record<string, Model>;
    dataset?: Record<string, Dataset>;
    frontend?: Record<string, Frontend>;
    pipeline?: Record<string, Pipeline>;
  };
  data: Composer,
  isNew: boolean;
  error: AppError | null;
  loading: boolean;
}

const initialComposerState: Composer = {
  nodes: [],
  connections: [],
};

export const initialState: ComposerState = {
  items: {},
  error: null,
  loading: false,
  data: initialComposerState,
  isNew: true
};

export const ComposerReducer = createReducer(
  initialState,
  on(ComposerActions.addToWorkBench, (state, { item }) => ({
    ...state,
    items: { ...state.items, [item.entityType]: { ...state.items[item.entityType], [item.id]: item } },
  })),
  on(ComposerActions.removeFromWorkBench, (state, { item }) => ({
    ...state,
    items: {
      ...state.items,
      [item.entityType]: Object.keys(state.items[item.entityType] || {})
        .filter(k => k !== item.id)
        .reduce((all, cur) => ({ ...all, [cur]: (state.items[item.entityType] || {})[cur] }), {})
    },
  })),
  on(ComposerActions.resetWorkbench, () => initialState),
  on(ComposerActions.editSolution, (state, { solution }) => ({
    ...state,
    isNew: !solution.id,

  })),
  on(ComposerActions.updateComposer, (state, { composer }) => ({ ...state, data: composer })),
  on(ComposerActions.addComposerNodes, (state, { nodes }) => ({
    ...state, data: { ...state.data, nodes: [...state.data.nodes, ...nodes] }
  })),
  on(ComposerActions.addComposerConnections, (state, { connections }) => ({
    ...state, data: { ...state.data, connections: [...state.data.connections, ...connections] }
  })),

);
