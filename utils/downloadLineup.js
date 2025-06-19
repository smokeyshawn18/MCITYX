// utils/downloadLineupImage.js
import { toPng } from "html-to-image";

export async function downloadLineupImage(fieldElement, username = "mcityx") {
  if (!fieldElement) return;

  try {
    const dataUrl = await toPng(fieldElement, {
      backgroundColor: "#016a2c",
      pixelRatio: 2,
      skipFonts: true,
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Watermark
    const watermarkText = "MCITYX";

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";

    ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const paddingX = 30;
    const paddingY = 30;

    ctx.fillText(
      watermarkText,
      canvas.width - paddingX,
      canvas.height - paddingY
    );

    const finalDataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = finalDataUrl;
    link.download = `${username}-mcityx.png`; // ✅ Correct template literal
    link.click();
  } catch (err) {
    console.error("Image download failed", err);
  }
}
