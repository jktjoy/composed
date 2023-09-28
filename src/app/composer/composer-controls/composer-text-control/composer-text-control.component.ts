import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComposerTextControl } from '../../composer.framework';
import { ComposerBaseControlComponent } from '../composer-base-control.component';

@Component({
  selector: 'app-composer-number-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './composer-text-control.component.html',
  styleUrls: ['./composer-text-control.component.scss'],
})
export class ComposerTextControlComponent extends ComposerBaseControlComponent<string> {
  @Input() data!: ComposerTextControl;

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value as ComposerTextControl['value'];

    this.data.setValue(value);
    this.cdr.detectChanges();
  }
}
