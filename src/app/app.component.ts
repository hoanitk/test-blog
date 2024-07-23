import { Component } from '@angular/core';
import { QuillModules } from 'ngx-quill';
import { defer, firstValueFrom, shareReplay } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog'
}
