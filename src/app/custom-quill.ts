import { BlockEmbed } from 'quill/blots/block';
import Scroll from 'quill/blots/scroll';
import Emitter from 'quill/core/emitter';

export class DraggableScroll extends Scroll {
  constructor(
    registry: any,
    domNode: HTMLDivElement,
    {
      emitter,
    }: {
      emitter: Emitter;
    }
  ) {
    super(registry, domNode, { emitter });
    this.domNode.addEventListener('drop', (e) => this.handleDrop(e), true);
  }

  handleDrop(event: any) {
    if (event.dataTransfer.files.length == 0) event.stopImmediatePropagation();
  }

  override handleDragStart(event: any): void {
  }
}

export class ImageBlot extends BlockEmbed {
  static override create(value: any) {
    let node = super.create();
    let image = document.createElement('img');
    image.setAttribute('src', value);
    node.appendChild(image);

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter caption...');
    input.value = value.caption || '';

    node.appendChild(input);
    return node;
  }

  static override value(node: any) {
    let image = node.querySelector('img');
    let input = node.querySelector('input');
    return {
      url: image.getAttribute('src'),
      caption: input.value
    };
  }
}
