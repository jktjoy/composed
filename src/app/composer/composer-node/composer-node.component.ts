import { CommonModule, KeyValue } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';
import { CoreSolutionEntity } from '../composer.interface';
import { ReteModule } from 'rete-angular-plugin/16';
import { ComposerNode } from '../composer.framework';
import { EntityIconComponent } from '../../entity-icon/entity-icon.component';

@Component({
  selector: 'app-composer-node',
  standalone: true,
  imports: [CommonModule, EntityIconComponent, ReteModule],
  templateUrl: './composer-node.component.html',
  styleUrls: ['./composer-node.component.scss'],
})
export class ComposerNodeComponent implements OnChanges {
  @Input() data!: ComposerNode<CoreSolutionEntity> & {
    data: CoreSolutionEntity;
  };
  @Input() emit!: (
    data: ComposerNode<CoreSolutionEntity> & { data: CoreSolutionEntity }
  ) => void;
  @Input() rendered!: () => void;

  seed = 0;

  @HostBinding('class.selected') get selected() {
    return this.data.selected;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
    this.seed++; // force render sockets
  }

  sortByIndex<
    N extends object,
    T extends KeyValue<string, N & { index?: number }>
  >(a: T, b: T) {
    const ai = a.value.index || 0;
    const bi = b.value.index || 0;

    return ai - bi;
  }
}
