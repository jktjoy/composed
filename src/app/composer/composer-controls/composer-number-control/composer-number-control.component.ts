import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComposerNumberControl } from '../../composer.framework';
import { ComposerBaseControlComponent } from '../composer-base-control.component';

@Component({
  selector: 'app-composer-number-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './composer-number-control.component.html',
  styleUrls: ['./composer-number-control.component.scss'],
})
export class ComposerNumberControlComponent extends ComposerBaseControlComponent<number> {
  @Input() data!: ComposerNumberControl;

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = +target.value as ComposerNumberControl['value'];

    this.data.setValue(value);
    this.cdr.detectChanges();
  }
}
