import { QuillModules } from "ngx-quill";

export const TitleQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
  keyboard: {
    bindings: {
      Enter: null,
      '13': null,
    },
  },
};

export const ContentQuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['image', 'video', 'link'],
    ['clean'],
  ],
};

export const MediaOnlyModules: QuillModules = {
  //   toolbar: [['image', 'video', 'link']],
  toolbar: false,
  imageResize: {}
};
