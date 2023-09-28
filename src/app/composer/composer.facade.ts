import { Injectable } from '@angular/core';
import { CoreSolutionEntity, Dataset, Frontend, Model, Pipeline, Solution } from './composer.interface';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as ComposerActions from './composer.actions';
import { Composer } from './composer.interface';
import * as ComposerSelectors from './composer.selectors';

@Injectable({
  providedIn: 'root',
})
export class ComposerFacade {
  itemIdMap$: Observable<Record<string, CoreSolutionEntity>>;
  itemCount$: Observable<number>;
  isNewSolution$: Observable<boolean>;
  composer$: Observable<Composer>;
  items$: Observable<{
    solution?: Record<string, Solution>;
    model?: Record<string, Model>;
    dataset?: Record<string, Dataset>;
    frontend?: Record<string, Frontend>;
    pipeline?: Record<string, Pipeline>;
  }>;

  constructor(private readonly store: Store) {
    this.itemIdMap$ = this.store.select(ComposerSelectors.selectItemIdMap);
    this.itemCount$ = this.store.select(ComposerSelectors.selectItemCount);
    this.isNewSolution$ = this.store.select(ComposerSelectors.selectIsNewSolution);
    this.composer$ = this.store.select(ComposerSelectors.selectComposer);
    this.items$ = this.store.select(ComposerSelectors.selectItems);
  }

  addToWorkBench(item: CoreSolutionEntity): void {
    this.store.dispatch(ComposerActions.addToWorkBench({ item }));
  }

  getNodeData(id: string): Observable<CoreSolutionEntity> {
    return this.itemIdMap$.pipe((map(itemIdMap => itemIdMap[id])));
  }

  removeFromWorkBench(item: CoreSolutionEntity): void {
    this.store.dispatch(ComposerActions.removeFromWorkBench({ item }));
  }

  editSolution(solution: Solution): void {
    this.store.dispatch(ComposerActions.editSolution({ solution }));
  }

  resetWorkbench(): void {
    this.store.dispatch(ComposerActions.resetWorkbench());
  }

  updateComposer(composer: Composer): void {
    this.store.dispatch(ComposerActions.updateComposer({ composer }));
  }
  addComposerNodes(nodes: Composer['nodes']): void {
    this.store.dispatch(ComposerActions.addComposerNodes({ nodes }));
  }
  addComposerConnections(connections: Composer['connections']): void {
    this.store.dispatch(ComposerActions.addComposerConnections({ connections }));
  }
}
