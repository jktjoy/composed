import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class ComposerEffects {

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) { }


  // TODO add / remove to workbench update the composer

  // composerUpdateOnAdd$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ComposerActions.addToWorkBench),
  //     withLatestFrom(this.store.select(ComposerSelectors.selectComposer)),

  //   )
  // );

  // composerUpdateOnRemove$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ComposerActions.removeFromWorkBench),
  //     withLatestFrom(this.store.select(ComposerSelectors.selectComposer)),
  //     map(([{ item }, composer]) => ComposerActions.updateComposer({
  //       composer: {
  //         ...composer,
  //         paletteNodeData: composer.paletteNodeData.filter(k => k.id !== item.id),
  //         diagramNodeData: composer.diagramNodeData.filter(k => k.id !== item.id),
  //       }
  //     })
  //     )
  //   )
  // );

}
