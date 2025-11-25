import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForOf } from '@angular/common';

type AssetRow = {
  id: string;
  name: string;
  ip: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
};

@Component({
  selector: 'app-risk-summary',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './risk-summary.component.html',
  styleUrls: ['./risk-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskSummaryComponent {
  assets = signal<AssetRow[]>([
    {
      id: '1',
      name: 'Loremipsumdolorsit',
      ip: '192.168.10.15',
      risk: 'critical'
    },
    {
      id: '2',
      name: 'Loremipsumdolorsit002',
      ip: '192.168.10.16',
      risk: 'critical'
    }
  ]);

  riskSummary = {
    critical: 2,
    high: 0,
    medium: 0,
    low: 0
  };

  trackById(_: number, row: AssetRow): string {
    return row.id;
  }
}
