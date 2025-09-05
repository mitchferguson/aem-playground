export function attachEditorControls(block, schema) {
  // create floating panel
  const panel = document.createElement('div');
  panel.className = 'button-editor-panel';
  panel.style.cssText = `
    position:absolute; top:4px; right:4px; z-index:9999;
    background:#fff; border:1px solid #ccc; border-radius:4px;
    padding:6px; font:12px system-ui;
  `;

  function makeSelect(key) {
    const sel = document.createElement('select');
    for (const v of schema.properties[key].enum) {
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = v;
      if ((block.dataset[key] || schema.properties[key].default) === v) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.onchange = () => { block.dataset[key] = sel.value; };
    const label = document.createElement('label');
    label.textContent = key;
    label.style.marginRight = '4px';
    const row = document.createElement('div');
    row.style.marginBottom = '4px';
    row.append(label, sel);
    return row;
  }

  panel.append(makeSelect('variant'), makeSelect('size'));
  block.style.position = 'relative';
  block.appendChild(panel);
}
