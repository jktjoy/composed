import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: '',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export abstract class ComposerBaseControlComponent<T> implements OnChanges {

  @Input() rendered!: () => void;

  @HostListener('pointerdown', ['$event'])
  @HostListener('dblclick', ['$event'])
  public pointerdown(event: MouseEvent) {
    event.stopPropagation();
  }

  constructor(protected readonly cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const seed = changes['seed'];
    const data = changes['data'];

    if ((seed && seed.currentValue as T !== seed.previousValue as T)
      || (data && data.currentValue as T !== data.previousValue as T)) {
      this.cdr.detectChanges();
    }
    requestAnimationFrame(() => this.rendered());
  }
}
