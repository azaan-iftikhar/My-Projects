/**
 * script.js — Infinity Logo Customizer
 * Handles: color picker, stroke slider, background switcher, SVG download
 */

// ---- Grab DOM elements ----
const colorPicker  = document.getElementById('colorPicker');
const colorHex     = document.getElementById('colorHex');
const strokeSlider = document.getElementById('strokeSlider');
const strokeVal    = document.getElementById('strokeVal');
const customPath   = document.getElementById('customPath');
const customSvg    = document.getElementById('customSvg');
const previewBox   = document.getElementById('previewBox');
const downloadBtn  = document.getElementById('downloadSvg');
const swatches     = document.querySelectorAll('.swatch');
const bgButtons    = document.querySelectorAll('.bg-btn');

// ---- Utility: Apply current color and stroke to the live preview ----
function updatePreview() {
  try {
    const color       = colorPicker.value;
    const strokeWidth = strokeSlider.value;

    // Update the SVG path
    customPath.setAttribute('stroke', color);
    customPath.setAttribute('stroke-width', strokeWidth);

    // Update hex label
    colorHex.textContent = color.toUpperCase();
  } catch (err) {
    console.error('[Logo customizer] updatePreview error:', err);
  }
}

// ---- Color picker change ----
colorPicker.addEventListener('input', () => {
  updatePreview();
  // Deactivate all swatches when using the raw picker
  swatches.forEach(s => s.classList.remove('active'));
});

// ---- Stroke slider change ----
strokeSlider.addEventListener('input', () => {
  strokeVal.textContent = strokeSlider.value;
  updatePreview();
});

// ---- Swatch click — apply preset color ----
swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    const color = swatch.getAttribute('data-color');

    // Update picker and preview
    colorPicker.value = color;
    updatePreview();

    // Mark swatch as active
    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

// ---- Background button click ----
bgButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bg             = btn.getAttribute('data-bg');
    const suggestedColor = btn.getAttribute('data-stroke-suggest');

    // Apply background to preview
    if (bg === 'transparent') {
      previewBox.style.background = 'transparent';
    } else {
      previewBox.style.background = bg;
    }

    // Suggest a matching stroke color
    if (suggestedColor) {
      colorPicker.value = suggestedColor;
      updatePreview();
      swatches.forEach(s => s.classList.remove('active'));
    }

    // Mark button as active
    bgButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- Download SVG ----
downloadBtn.addEventListener('click', () => {
  try {
    // Serialize the current SVG to a string
    const serializer = new XMLSerializer();
    const svgString  = serializer.serializeToString(customSvg);

    // Wrap in a proper SVG document string with namespace
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);

    // Trigger download
    const link    = document.createElement('a');
    link.href     = url;
    link.download = 'infinity-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL after download to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // Visual feedback on button
    downloadBtn.textContent = '✓ Downloaded!';
    setTimeout(() => { downloadBtn.textContent = '⬇ Download SVG'; }, 2000);

  } catch (err) {
    console.error('[Logo customizer] Download failed:', err);
    downloadBtn.textContent = '⚠ Download failed';
    setTimeout(() => { downloadBtn.textContent = '⬇ Download SVG'; }, 2000);
  }
});

// ---- Init: Run on load ----
updatePreview();
