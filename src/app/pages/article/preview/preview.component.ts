import { Component } from '@angular/core';
import { ArticleModel } from '../../../models/article.model';
import { ArticleService } from '../../../../services/article-service.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  article: ArticleModel = {};
  constructor(private articleService: ArticleService ){
    this.article = this.articleService.getCurrentArticle() ?? {};
  }
}
