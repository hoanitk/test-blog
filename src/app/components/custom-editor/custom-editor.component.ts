import { Component, HostListener, model, OnInit, output } from '@angular/core';

import {
  ContentChange,
  QuillEditorComponent,
  QuillModules,
  SelectionChange,
} from 'ngx-quill';
import Quill, { Parchment } from 'quill/core';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrl: './custom-editor.component.css',
})
export class CustomEditorComponent implements OnInit{
  mediaOnlyModules: QuillModules = {
    toolbar: {
      container: [[{ size: ['small', 'large', 'huge'] }]],
      handlers: {
        size: this.sizeHandler.bind(this),
      },
    },
  };
  editorContent = model<string>('');
  editorTitle = model<string>('');
  onChange = output<any>();
  id = 'plus-button' + new Date().getTime();
  editor: any;

  constructor() {}

  ngOnInit(): void {
  }

  onContentChanged(event: ContentChange) {
    const editor = event.editor;
    const lines = editor.getLines();
    if (lines.length > 0 && lines[0].domNode.tagName !== 'H1') {
      editor.formatLine(0, 1, { header: 1 });
    }
    if (lines.length > 0) {
      this.editorTitle.set(lines[0].domNode.innerHTML);
    }

    if (lines.length > 1) {
      const index = editor.getSelection()!.index;
      const button = document.getElementById(this.id)!;
      const top = editor.getBounds(index)!.top;
      button.style.top = top - 5 + 'px';
      button.style.display = 'block';
      button.onclick = () => this.addModule(top);
    }

    lines.forEach((line, index: number) => {
      const lineDom = line.domNode;
      if (index > 0) {
        lineDom.classList.add('content-line');
      }
    });
    if (event.source === 'user') {
      document.querySelectorAll('.image-container input').forEach((input: any) => {
        input.addEventListener('input', function() {
          const imageBlot = input.closest('.image-container');
          if (imageBlot) {
            const caption = imageBlot.querySelector('small');
            if(caption) {
              caption.innerHTML = input.value;
            } else {
              const captionNew = document.createElement('small');
              captionNew.classList.add('caption')
              captionNew.innerHTML = input.value;
              imageBlot.appendChild(captionNew);
            }
          }
        });
      });
    }
    this.onChange.emit(event);
    editor.focus;
  }

  selectionChange(event: SelectionChange) {
    const editor = event.editor;
    const index = editor.getSelection()?.index;
    if (index) {
      const button = document.getElementById(this.id)!;
      const top = editor.getBounds(index)!.top;
      button.style.top = top - 5 + 'px';
      button.style.display = 'block';
      button.onclick = () => this.addModule(top);
    }
  }

  onEditorCreated(editor: any) {
    this.editor = editor;
  }

  uploadImage(file: File, editor: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const range = editor.getSelection();
      const imageUrl = e.target.result;
      editor.insertEmbed(range.index, 'image', imageUrl);
    };
    reader.readAsDataURL(file);
  }

  addModule(index: number) {
    const menuToolt = document
      .getElementById(this.id)
      ?.parentElement?.querySelector('.menu-toolt') as HTMLElement;
    menuToolt.style.top = index + 'px';
    menuToolt.style.display = 'block';
  }

  uploadImg(editor: QuillEditorComponent) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    const quillEditor = editor.quillEditor;
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      const range = quillEditor.getSelection()!;
      if (file && range) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          quillEditor.insertEmbed(
            range.index,
            'imageBlot',
            reader.result,
            Quill.sources.USER
          );
        };
      }
    };
  }

  uploadVideo(editor: any) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const buttonMenu = document.getElementById(this.id)!;
    const menuToolt = buttonMenu.parentElement?.querySelector(
      '.menu-toolt'
    ) as HTMLElement;
    if (event.target.parentElement !== buttonMenu) {
      menuToolt.style.display = 'none';
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  oncontextmenu(event: any) {
    const buttonMenu = document.getElementById(this.id)!;
    const menuToolt = buttonMenu.parentElement?.querySelector(
      '.menu-toolt'
    ) as HTMLElement;
    menuToolt.style.display = 'none';
  }

  sizeHandler(value: string) {
    const range = this.editor.getSelection();
    if (range) {
      const [leaf] = this.editor.getLeaf(range.index);
      if (
        leaf &&
        leaf.domNode &&
        leaf.domNode.tagName?.toLowerCase() === 'img'
      ) {
        if (value === 'small') {
          leaf.domNode.setAttribute('style', 'width: 200px');
        } else if (value === 'large') {
          leaf.domNode.setAttribute('style', 'width: 400px');
        } else if (value === 'huge') {
          leaf.domNode.setAttribute('style', 'width: 100%');
        }
      }
    }
  }
}
