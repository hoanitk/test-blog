import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleModel } from '../app/models/article.model';
import { BehaviorSubject, distinctUntilChanged, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _article = new BehaviorSubject<ArticleModel | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  saveImageToDatabase(image: Blob): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    // return result
    this.http.post('/image/upload', image, { headers }).subscribe((res) => {
      throw new Error();
    });
  }

  addNewArticle(title: string, content: string): void {
    const article = { title, content, created: new Date(), public: false };
    const articleJson = JSON.stringify(article);
    this._article.next(article);

    const articleBlob = new Blob([articleJson], { type: 'text/plain' });
    const articleFile = new File([articleBlob], '../../data/article.json');
    // save
  }

  getCurrentArticle(): Observable<ArticleModel> {
    return this._article.asObservable().pipe(
      filter((res: any) => res && res.public),
      distinctUntilChanged()
    );
  }

  publicArticle() {
    const article = this._article.value;
    if(article){
      article.public = true;
      console.log('public', article);
      this._article.next({ ...article });
      this.router.navigateByUrl('/article/preview');
    }
  }
}
