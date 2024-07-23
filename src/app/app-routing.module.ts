import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-article',
    pathMatch: 'full',
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./pages/article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'create-article',
    component: EditBlogComponent
  },
  {
    path: '**',
    redirectTo: 'create-article',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
