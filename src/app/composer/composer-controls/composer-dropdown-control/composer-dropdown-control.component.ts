import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComposerDropdownControl } from '../../composer.framework';
import { ComposerBaseControlComponent } from '../composer-base-control.component';

@Component({
  selector: 'app-composer-number-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './composer-dropdown-control.component.html',
  styleUrls: ['./composer-dropdown-control.component.scss'],
})
export class ComposerDropdownControlComponent extends ComposerBaseControlComponent<string> {
  @Input() data!: ComposerDropdownControl;

  onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value = target.value as ComposerDropdownControl['value'];

    this.data.setValue(value);
    this.cdr.detectChanges();
  }
}
