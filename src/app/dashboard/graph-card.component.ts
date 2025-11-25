import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';

type GraphNodeType = 'actor' | 'server' | 'asset';

type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  x: number;
  y: number;
  ip?: string;
  hasAlert?: boolean;
};

type GraphEdge = {
  from: string;
  to: string;
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
      x: 16,
      y: 52
    },
    {
      id: 's1',
      label: 'Loremipsu',
      type: 'server',
      x: 38,
      y: 52
    },
    {
      id: 's2',
      label: 'Loremipsu',
      type: 'server',
      x: 60,
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
    { from: 'actor', to: 's1' },
    { from: 's1', to: 's2' },
    { from: 's2', to: 'a1', viaX: 72, viaY: 40 },
    { from: 's2', to: 'a2', viaX: 72, viaY: 64 }
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

    if (edge.viaX !== undefined && edge.viaY !== undefined) {
      return `${from.x},${from.y} ${edge.viaX},${edge.viaY} ${to.x},${to.y}`;
    }

    return `${from.x},${from.y} ${to.x},${to.y}`;
  }
}
