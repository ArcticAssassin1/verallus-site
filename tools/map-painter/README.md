# Map painter

Paints the world map in `app/components/WorldMap.tsx`.

The continent shapes and every placement come from the hand-drawn map (viewBox 960×560). The painter traces those shapes and paints relief over them: fractal coastlines, ridged mountains, hillshade, ice, lava, the Scar, clouds. The clickable map sits on top of the painting.

## Files

- `common.py`: the shapes (copied from `WorldMap.tsx`), noise and drawing helpers.
- `base.py`: the base painting. Writes `out/verallus-relief.webp` and `out/shapes.json` (traced region outlines for hover, plus the River of Echoes path).
- `layers.py`: Skyspire Zenith and the Oathless storm as separate transparent images, so they can float and spin.
- `export.py`: copies the images to `public/map/` and writes `app/data/mapShapes.ts`.

## Run

```
pip install numpy scipy opencv-python pillow
python3 base.py      # about a minute
python3 layers.py
MAPV=2 python3 export.py   # bump MAPV whenever the images change, so browsers fetch the new ones
```

## Changing the map

- Moving a continent: edit its path in `common.py` (`P`) and in `WorldMap.tsx` (its hit area), then rerun all three.
- Mountain ranges: `ranges` in `base.py`, as polylines in map units.
- Volcanoes and lava: `VOLC` and `VENTS_E` in `base.py`.
- The River of Echoes: `ECHO` in `base.py`.

Everything is seeded, so a rerun with no edits gives the same map.
