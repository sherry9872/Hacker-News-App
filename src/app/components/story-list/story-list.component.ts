import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../../services/hacker-news.service';
import { CommonModule } from '@angular/common';
import { StoryItemComponent } from '../story-item/story-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [FormsModule, CommonModule, StoryItemComponent],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
  providers:[HackerNewsService]
})
export class StoryListComponent implements OnInit {
  stories: any[] = [];
  loading = false;
  searchQuery = '';
  currentPage = 1;
  storiesPerPage = 10;

  constructor(public hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.loading = true;
    this.hackerNewsService.getNewestStories().subscribe({
      next: (stories) => {
        this.stories = stories;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.hackerNewsService.searchStories(query).subscribe(stories => this.stories = stories);
  }

  get paginatedStories(): any[] {
    const start = (this.currentPage - 1) * this.storiesPerPage;
    const end = start + this.storiesPerPage;
    return this.stories.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage * this.storiesPerPage) < this.stories.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
