import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';

export const routes: Routes = [
    { path: '', component: StoryListComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})  

export class AppRoute {
    

}