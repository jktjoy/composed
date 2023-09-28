import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CoreSolutionEntity } from '../composer.interface';
import { ReteModule } from 'rete-angular-plugin/16';
import { Position } from 'rete-angular-plugin/16/types';
import { ComposerConnection } from '../composer.framework';

@Component({
  selector: 'app-composer-connection',
  standalone: true,
  imports: [CommonModule, ReteModule],
  templateUrl: './composer-connection.component.html',
  styleUrls: ['./composer-connection.component.scss'],
})
export class ComposerConnectionComponent {
  @Input() data!: ComposerConnection<CoreSolutionEntity>;
  @Input() start!: Position;
  @Input() end!: Position;
  @Input() path!: string;
}
