// Types for vite-imagetools imports used in src/data/projectImages.ts
interface ImagetoolsPicture {
  /** format → srcset string, e.g. { avif: '/a-640.avif 640w, …', webp: '…', jpeg: '…' } */
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

declare module '*&as=picture' {
  const picture: ImagetoolsPicture;
  export default picture;
}

declare module '*&inline' {
  const dataUrl: string;
  export default dataUrl;
}
