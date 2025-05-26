// utils/downloadLineupImage.js
import { toPng } from 'html-to-image'; // or your preferred library

export async function downloadLineupImage(fieldElement) {
  if (!fieldElement) return;
try {
  const dataUrl = await toPng(fieldElement, {
    backgroundColor: '#016a2c',
    pixelRatio: 2,
  });

  const img = new Image();
  img.src = dataUrl;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Watermark styling
  const watermarkText = 'MCITYX';
  const fontSize = Math.floor(canvas.width / 15); // responsive font size
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // black with 60% opacity for subtlety
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';

  // Padding from edges
  const paddingX = 30;
  const paddingY = 30;

  // Optionally add a subtle shadow for better visibility
  ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw the watermark text bottom-right aligned with padding
  ctx.fillText(watermarkText, canvas.width - paddingX, canvas.height - paddingY);

  const finalDataUrl = canvas.toDataURL('image/png');

  // Trigger download
  const link = document.createElement('a');
  link.href = finalDataUrl;
  link.download = 'mcity-lineup-field.png';
  link.click();
} catch (err) {
  console.error('Image download failed', err);
}

}
