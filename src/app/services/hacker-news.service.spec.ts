import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://localhost:7074/api/HackerNews/stories';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HackerNewsService ]
    });

    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve stories from the API via GET', () => {
    const dummyStories = [ { id: 1, title: 'Test Story', url: 'http://example.com' } ];

    service.getNewestStories().subscribe(stories => {
      expect(stories.length).toBe(1);
      expect(stories).toEqual(dummyStories);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(dummyStories);
  });

  it('should handle error', () => {
    const errorMessage = 'Something went wrong; please try again later.';

    service.getNewestStories().subscribe(
      () => fail('expected an error, not stories'),
      (error: string) => expect(error).toBe(errorMessage)
    );

    const req = httpMock.expectOne(`${service['apiUrl']}/stories`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  describe('searchStories', () => {
    it('should return filtered stories based on search query', () => {
      const dummyStories: any[] = [
        { id: 1, title: 'Story 1' },
        { id: 2, title: 'Another Story' }
      ];

      service.searchStories('story').subscribe(stories => {
        expect(stories.length).toBe(2);
        expect(stories).toEqual(dummyStories);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/stories`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyStories);
    });

    it('should return empty array if no stories match the query', () => {
      const dummyStories: any[] = [
        { id: 1, title: 'Story 1' }
      ];

      service.searchStories('not found').subscribe(stories => {
        expect(stories.length).toBe(0);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/stories`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyStories);
    });

  });

});
