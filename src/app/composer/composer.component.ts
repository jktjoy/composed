import { MOCK_DATA } from './../app.constants';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReteModule } from 'rete-angular-plugin/16';
import { ComposerFacade } from './composer.facade';
import { ComposerEngine, CustomNodeAction } from './composer.interface';
import { composerEditor } from './composer.util';
import { Params } from '../app.constants';

@Component({
  selector: 'app-composer',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReteModule,
  ],
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss'],
})
export class ComposerComponent implements AfterViewInit, OnDestroy {
  showEntities = true;

  entityIdMap$ = this.composerFacade.itemIdMap$;

  constructor(
    private readonly injector: Injector,
    private readonly composerFacade: ComposerFacade
  ) {

  }

  @ViewChild('composerContainer') composerContainer!: ElementRef;

  engine: ComposerEngine | null = null;

  async ngAfterViewInit(): Promise<void> {
    const el = this.composerContainer.nativeElement;
    const params = Params;

    if (el) {
      this.engine = await composerEditor(el, this.injector, params);
    }
  }

  async ngOnDestroy(): Promise<void> {
    this.engine?.destroy();
  }

  toggleEntities(): void {
    this.showEntities = !this.showEntities;
    this.nodeActionPerformed({...MOCK_DATA.dataset[0], action: 'add'} as unknown as CustomNodeAction)
  }

  async nodeActionPerformed({ action, ...node }: CustomNodeAction) {
    if (action === 'add') {
      this.composerFacade.addToWorkBench(node);
      const composerNode = await this.engine?.composerAddNode(node);

      //TODO take care of this in composer.effects
      if (composerNode && this.engine) {
        this.composerFacade.updateComposer(this.engine.getState());
      }
    } else if (action === 'remove') {
      this.composerFacade.removeFromWorkBench(node);
      await this.engine?.composerRemoveNode(node.id);

      //TODO take care of this in composer.effects
      if (this.engine) {
        this.composerFacade.updateComposer(this.engine.getState());
      }
    }
  }
}
