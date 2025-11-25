import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar.component';
import { TopBarComponent } from './layout/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private sidebarCollapsedSignal = signal(false);

  sidebarCollapsed = computed(() => this.sidebarCollapsedSignal());

  toggleSidebar(): void {
    this.sidebarCollapsedSignal.update((v) => !v);
  }
}
