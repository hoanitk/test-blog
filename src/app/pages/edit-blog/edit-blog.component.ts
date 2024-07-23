import { ArticleService } from './../../../services/article-service.service';
import { Component } from '@angular/core';
import { ArticleModel } from '../../models/article.model';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
})
export class EditBlogComponent {
  article: ArticleModel = {
    title: '',
    content: '',
    created: new Date(),
    public: false
  };
  editorContent: string = '';
  title = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
  }

  saveJsonArticle(): void {
    this.articleService.addNewArticle(this.title, this.editorContent);
  }

  publicArticle() {
    this.articleService.publicArticle();
  }
}
