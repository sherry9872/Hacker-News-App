import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-story-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.css']
})
export class StoryItemComponent {
  @Input() story?: { id: number; title: string; url?: string };
}