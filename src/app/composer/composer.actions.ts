
import { CoreSolutionEntity, Solution } from './composer.interface';
import { createAction, props } from '@ngrx/store';
import { Composer } from './composer.interface';


export const addToWorkBench = createAction('[Composer] Add to Workbench', props<{ item: CoreSolutionEntity }>());
export const removeFromWorkBench = createAction('[Composer] Remove from Workbench', props<{ item: CoreSolutionEntity }>());
export const editSolution = createAction('[Composer] Edit Solution', props<{ solution: Solution }>());
export const resetWorkbench = createAction('[Composer] Reset Workbench');
export const updateComposer = createAction('[Composer] Update Composer', props<{ composer: Composer }>());
export const addComposerNodes = createAction('[Composer] Add Nodes', props<{ nodes: Composer['nodes'] }>());
export const addComposerConnections = createAction('[Composer] Add Connections', props<{ connections: Composer['connections'] }>());
