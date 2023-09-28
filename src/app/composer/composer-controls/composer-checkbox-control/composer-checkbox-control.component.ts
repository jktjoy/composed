import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComposerCheckboxControl } from '../../composer.framework';
import { ComposerBaseControlComponent } from '../composer-base-control.component';

@Component({
  selector: 'app-composer-number-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './composer-checkbox-control.component.html',
  styleUrls: ['./composer-checkbox-control.component.scss'],
})
export class ComposerCheckboxControlComponent extends ComposerBaseControlComponent<boolean> {
  @Input() data!: ComposerCheckboxControl;

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.checked as ComposerCheckboxControl['value'];

    this.data.setValue(value);
    this.cdr.detectChanges();
  }
}
