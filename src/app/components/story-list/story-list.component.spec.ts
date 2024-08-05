import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../../services/hacker-news.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryItemComponent } from '../story-item/story-item.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let hackerNewsServiceSpy: jasmine.SpyObj<HackerNewsService>;
  let hackerNewsService: HackerNewsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    hackerNewsServiceSpy = jasmine.createSpyObj('HackerNewsService', ['getNewestStories', 'searchStories']);
    hackerNewsServiceSpy.getNewestStories.and.returnValue(of([
      { id: 1, title: 'Story 1' },
      { id: 2, title: 'Story 2' }
    ]));
    hackerNewsServiceSpy.searchStories.and.returnValue(of([
      { id: 3, title: 'Search Result' }
    ]));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        StoryItemComponent,
        StoryListComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: HackerNewsService, useValue: hackerNewsServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hackerNewsService = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchStories on ngOnInit', () => {
    spyOn(component, 'fetchStories').and.callThrough();
    component.ngOnInit();
    expect(component.fetchStories).toHaveBeenCalled();
  });

  it('should paginate stories correctly', () => {
    component.currentPage = 1;
    component.stories = [
      { id: 1, title: 'Story 1' },
      { id: 2, title: 'Story 2' },
      { id: 3, title: 'Story 3' },
      { id: 4, title: 'Story 4' },
      { id: 5, title: 'Story 5' },
      { id: 6, title: 'Story 6' },
      { id: 7, title: 'Story 7' },
      { id: 8, title: 'Story 8' },
      { id: 9, title: 'Story 9' },
      { id: 10, title: 'Story 10' },
      { id: 11, title: 'Story 11' }
    ];

    expect(component.paginatedStories.length).toBe(10);
    expect(component.paginatedStories[0]).toEqual({ id: 1, title: 'Story 1' });

    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedStories[0]).toEqual({ id: 11, title: 'Story 11' });
  });

  it('should update the current page correctly', () => {
    component.stories = [
      { id: 1, title: 'Story 1' },
      { id: 2, title: 'Story 2' },
      { id: 3, title: 'Story 3' },
      { id: 4, title: 'Story 4' },
      { id: 5, title: 'Story 5' },
      { id: 6, title: 'Story 6' },
      { id: 7, title: 'Story 7' },
      { id: 8, title: 'Story 8' },
      { id: 9, title: 'Story 9' },
      { id: 10, title: 'Story 10' },
      { id: 11, title: 'Story 11' }
    ];

    component.currentPage = 1;
    fixture.detectChanges();
    expect(component.paginatedStories.length).toBe(10);
    expect(component.paginatedStories[0].title).toBe('Story 1');

    component.nextPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedStories[0].title).toBe('Story 11');

    component.prevPage();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(component.paginatedStories[0].title).toBe('Story 1');
  });
});
