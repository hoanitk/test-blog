import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { provideHttpClient } from '@angular/common/http';
import { CustomEditorComponent } from './components/custom-editor/custom-editor.component';
import { DraggableScroll } from './custom-quill';
import Quill from 'quill/core';

Quill.register(DraggableScroll);

@NgModule({
  declarations: [AppComponent, EditBlogComponent, CustomEditorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot({
      theme: 'bubble',
      modules: {
      }
    }),
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
