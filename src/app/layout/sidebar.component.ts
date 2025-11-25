import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type SidebarItem = {
  icon: string;
  label: string;
  active?: boolean;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() collapsed = false;

  items: SidebarItem[] = [
    { icon: 'space_dashboard', label: 'Lorem', active: true },
    { icon: 'insert_chart_outlined', label: 'Lorem' },
    { icon: 'shield', label: 'Lorem' },
    { icon: 'timeline', label: 'Lorem' },
    { icon: 'bar_chart', label: 'Lorem' },
    { icon: 'settings', label: 'Lorem' }
  ];

  secondary: SidebarItem[] = [
    { icon: 'help_outline', label: 'Lorem' },
    { icon: 'settings', label: 'Lorem' }
  ];
}
