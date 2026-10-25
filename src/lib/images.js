// Drop-in image loader. Any image saved to src/assets/generated/ is picked up
// by its base filename (e.g. "macropad.png" -> generatedImage("macropad")), so
// new thumbnails can be added without touching component code. If no file
// with that name exists yet, the provided fallback is used instead.
const generated = import.meta.glob("../assets/generated/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
});

export function generatedImage(name, fallback = null) {
  const key = Object.keys(generated).find((path) =>
    path.split("/").pop().replace(/\.[^.]+$/, "") === name
  );
  return key ? generated[key] : fallback;
}
