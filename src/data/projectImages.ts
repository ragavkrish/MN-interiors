/**
 * Responsive project photos.
 *
 * Each photo is imported twice:
 *  - `?w=640;1080;1600&format=avif;webp;jpg&as=picture` → AVIF/WebP/JPEG at up to 3 widths
 *  - `?w=24&format=webp&inline` → a tiny blurred preview shown while the real photo loads
 *
 * To add a real project photo later: drop the original into src/assets/projects/,
 * add a `photo(...)` entry here, and reference it from PROJECTS in content.ts.
 */
import kitchenPic from '../assets/images/mn_kitchen_showcase_1795762703455.jpg?w=640;1080;1600&format=avif;webp;jpg&as=picture';
import kitchenBlur from '../assets/images/mn_kitchen_showcase_1795762703455.jpg?w=24&format=webp&inline';
import tvWallPic from '../assets/images/mn_tv_wall_showcase_1795762706221.jpg?w=640;1080;1600&format=avif;webp;jpg&as=picture';
import tvWallBlur from '../assets/images/mn_tv_wall_showcase_1795762706221.jpg?w=24&format=webp&inline';
import poojaPic from '../assets/images/mn_pooja_unit_showcase_1795762706457.jpg?w=640;1080;1600&format=avif;webp;jpg&as=picture';
import poojaBlur from '../assets/images/mn_pooja_unit_showcase_1795762706457.jpg?w=24&format=webp&inline';
import wardrobePic from '../assets/images/mn_wardrobe_showcase_1795762706339.jpg?w=640;1080;1600&format=avif;webp;jpg&as=picture';
import wardrobeBlur from '../assets/images/mn_wardrobe_showcase_1795762706339.jpg?w=24&format=webp&inline';
import shopPic from '../assets/images/mn_shop_interior_showcase_1795762707427.jpg?w=640;1080;1600&format=avif;webp;jpg&as=picture';
import shopBlur from '../assets/images/mn_shop_interior_showcase_1795762707427.jpg?w=24&format=webp&inline';

export interface ResponsivePhoto {
  picture: ImagetoolsPicture;
  /** Tiny blurred preview (data URL) shown until the photo has loaded */
  blur: string;
}

const photo = (picture: ImagetoolsPicture, blur: string): ResponsivePhoto => ({ picture, blur });

export const PHOTOS = {
  kitchen: photo(kitchenPic, kitchenBlur),
  tvWall: photo(tvWallPic, tvWallBlur),
  pooja: photo(poojaPic, poojaBlur),
  wardrobe: photo(wardrobePic, wardrobeBlur),
  shop: photo(shopPic, shopBlur),
};
