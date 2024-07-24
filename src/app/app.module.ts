import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CustomEditorComponent } from './components/custom-editor/custom-editor.component';
import { DraggableScroll, ImageBlot } from './custom-quill';
import Quill from 'quill/core';

ImageBlot.blotName = 'imageBlot';
ImageBlot.tagName = 'div';
ImageBlot.className = 'image-container';
Quill.register(DraggableScroll);
Quill.register(ImageBlot);

@NgModule({
  declarations: [AppComponent, EditBlogComponent, CustomEditorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot({
      theme: 'bubble',
    }),
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
