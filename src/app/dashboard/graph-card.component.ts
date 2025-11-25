import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';

type GraphNodeType = 'actor' | 'server' | 'asset' | 'junction';

type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  x: number;
  y: number;
  ip?: string;
  hasAlert?: boolean;
};

type GraphEdgeKind = 'arrow' | 'line';

type GraphEdge = {
  from: string;
  to: string;
  kind: GraphEdgeKind;
  viaX?: number;
  viaY?: number;
};

@Component({
  selector: 'app-graph-card',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, NgClass],
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphCardComponent {
  nodes = signal<GraphNode[]>([
    {
      id: 'actor',
      label: 'Loremipsumm',
      type: 'actor',
      x: 18,
      y: 52
    },
    {
      id: 's1',
      label: 'Loremipsu',
      type: 'server',
      x: 40,
      y: 52
    },
    {
      id: 's2',
      label: 'Loremipsu',
      type: 'server',
      x: 62,
      y: 52
    },
    {
      id: 'j1',
      label: '',
      type: 'junction',
      x: 72,
      y: 52
    },
    {
      id: 'a1',
      label: 'Loremipsumdolorsit',
      type: 'asset',
      x: 86,
      y: 30,
      ip: '192.168.1.1',
      hasAlert: true
    },
    {
      id: 'a2',
      label: 'Loremipsumdolorsit002',
      type: 'asset',
      x: 86,
      y: 74,
      ip: '192.168.1.2',
      hasAlert: true
    }
  ]);

  edges = signal<GraphEdge[]>([
    { from: 'actor', to: 's1', kind: 'arrow' },
    { from: 's1', to: 's2', kind: 'arrow' },
    { from: 's2', to: 'j1', kind: 'line' },
    { from: 'j1', to: 'a1', kind: 'line', viaX: 80, viaY: 40 },
    { from: 'j1', to: 'a2', kind: 'line', viaX: 80, viaY: 64 }
  ]);

  selectedId = signal<string | null>(null);

  selectedNode = computed(() => {
    const id = this.selectedId();
    if (!id) {
      return null;
    }
    return this.nodes().find(n => n.id === id) ?? null;
  });

  selectNode(id: string): void {
    this.selectedId.update(current => (current === id ? null : id));
  }

  getPosition(id: string): GraphNode | null {
    return this.nodes().find(n => n.id === id) ?? null;
  }

  getEdgePoints(edge: GraphEdge): string {
    const from = this.getPosition(edge.from);
    const to = this.getPosition(edge.to);

    if (!from || !to) {
      return '';
    }

    // horizontal segments
    if (!edge.viaX && !edge.viaY && from.y === to.y) {
      const y = from.y;
      const startX = from.x + 4;
      const endX = to.x - 4;
      return `${startX},${y} ${endX},${y}`;
    }

    // Y-branch from junction to assets
    if (edge.viaX !== undefined && edge.viaY !== undefined) {
      const startX = from.x + 4;
      const startY = from.y;
      const midX = edge.viaX;
      const midY = edge.viaY;
      const endX = to.x - 4;
      const endY = to.y;
      return `${startX},${startY} ${midX},${midY} ${endX},${endY}`;
    }

    return `${from.x},${from.y} ${to.x},${to.y}`;
  }

  isArrow(edge: GraphEdge): boolean {
    return edge.kind === 'arrow';
  }

  riskLegend = [
    { colorClass: 'legend-critical', label: 'Critical' },
    { colorClass: 'legend-warning', label: 'Warning' },
    { colorClass: 'legend-secure', label: 'Secure' }
  ];

  footerLegend = [
    { colorClass: 'legend-critical', label: 'Lorem' },
    { colorClass: 'legend-warning', label: 'Lorem' },
    { colorClass: 'legend-secure', label: 'Lorem' }
  ];
}
