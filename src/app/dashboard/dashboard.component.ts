import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { GraphCardComponent } from './graph-card.component';
import { RiskSummaryComponent } from './risk-summary.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, GraphCardComponent, RiskSummaryComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
