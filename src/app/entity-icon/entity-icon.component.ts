import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CoreSolutionEntityKey } from '../composer/composer.interface';
import { JarsConfig } from '../app.constants';

@Component({
  selector: 'app-entity-icon',
  standalone: true,
  templateUrl: './entity-icon.component.html',
  styleUrls: ['./entity-icon.component.scss'],
  imports: [NgIf]
})
export class EntityIconComponent {
  @Input() entity: CoreSolutionEntityKey = 'solution';
  @Input() color: 'primary' | 'accent' | 'warn' | string = 'primary';
  @Input() size = 25;

  themeColors = ['primary', 'accent', 'warn'];
  jarConfigMap = JarsConfig
    .reduce((all, cur) => ({
      ...all,
      [cur.key]: cur
    }), {} as Record<CoreSolutionEntityKey, typeof JarsConfig[0]>);
}
