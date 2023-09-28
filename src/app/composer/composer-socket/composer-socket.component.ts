import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';
import { ReteModule } from 'rete-angular-plugin/16';
import { ComposerSocket } from '../composer.framework';

@Component({
  selector: 'app-composer-socket',
  standalone: true,
  imports: [CommonModule, ReteModule],
  templateUrl: './composer-socket.component.html',
  styleUrls: ['./composer-socket.component.scss'],
})
export class ComposerSocketComponent implements OnChanges {
  @Input() data!: ComposerSocket;
  @Input() rendered!: () => void;

  @HostBinding('title') get title() {
    return this.data.name;
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
  }
}
