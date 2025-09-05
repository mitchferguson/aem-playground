export default async function decorate(block) {
  // read schema defaults
  const schema = await fetch('/blocks/button/schema.json').then(r => r.json());

  const variant = block.dataset.variant || schema.properties.variant.default;
  const size = block.dataset.size || schema.properties.size.default;

  block.dataset.variant = variant;
  block.dataset.size = size;

  // add base styling class
  block.classList.add(`button--${variant}`, `button--${size}`);

  // Attach editor UI in Preview/UE
  if (document.querySelector('aem-sidekick')) {
    const { attachEditorControls } = await import('./button-editor.js');
    attachEditorControls(block, schema);
  }
}
