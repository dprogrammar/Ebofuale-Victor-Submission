import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onToggle(): void {
    this.menuToggle.emit();
  }
}
