import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleModel } from '../app/models/article.model';
import articleData from '../../data/article.json'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private http: HttpClient, private router: Router) { }

  saveImageToDatabase(image: Blob): void {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    // return result
    this.http.post('/image/upload', image, {headers}).subscribe(res => {
      throw new Error();
    });
  }

  addNewArticle(title: string ,article: string): void {
    const articleJson = JSON.stringify({title, content: article, created: new Date(), public: false});

    const articleBlob = new Blob([articleJson], {type: 'text/plain'});
    const articleFile = new File([articleBlob], '../../data/article.json');
    // save
    const form = new FormData();
    form.append('file', articleFile);
  }

  getCurrentArticle(): ArticleModel | null {
    if (articleData) {
      return articleData as ArticleModel;
    }
    return null;
  }
}
