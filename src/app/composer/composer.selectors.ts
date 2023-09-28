import { CoreSolutionEntity, CoreSolutionEntityKey } from './composer.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COMPOSER_FEATURE_KEY } from './composer.constants';
import { ComposerState } from './composer.reducer';

export const selectComposerState = createFeatureSelector<ComposerState>(COMPOSER_FEATURE_KEY);

export const selectComposer = createSelector(selectComposerState, (state) => state.data);
export const selectIsNewSolution = createSelector(selectComposerState, (state) => state.isNew);
export const selectItemCount = createSelector(selectComposerState,
  (state) => (Object.keys(state.items) as CoreSolutionEntityKey[])
    .reduce((all, cur) => all + Object.keys(state.items[cur] || {}).length, 0)
);
export const selectItems = createSelector(selectComposerState, (state) => state.items);
export const selectItemIdMap = createSelector(selectComposerState,
  (state) => (Object.keys(state.items) as CoreSolutionEntityKey[])
    .reduce((all, cur) => ({ ...all, ...(state.items[cur] || {}) }), {} as Record<string, CoreSolutionEntity>)
);
