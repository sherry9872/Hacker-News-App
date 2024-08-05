import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryItemComponent } from './story-item.component';
import { CommonModule } from '@angular/common';

describe('StoryItemComponent', () => {
  let component: StoryItemComponent;
  let fixture: ComponentFixture<StoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, StoryItemComponent] // Import standalone component here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the story title when story input is provided', () => {
    component.story = { id: 1, title: 'Story Title', url: 'https://example.com' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain('Story Title');
  });

  it('should display the URL if provided', () => {
    component.story = { id: 1, title: 'Story Title', url: 'https://example.com' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.href).toBe('https://example.com/');
  });

  it('should not display a URL if not provided', () => {
    component.story = { id: 1, title: 'Story Title' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeNull();
    expect(compiled.querySelector('span')?.textContent).toContain('No link available');
  });
});
