import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/article.model';
import { ArticleService } from '../../../../services/article-service.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnInit {
  article: ArticleModel = {
    title: '',
    content: '',
    created: new Date(),
    public: false,
  };

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getCurrentArticle().subscribe(res => {
      this.article = res;
    })
  }
}
