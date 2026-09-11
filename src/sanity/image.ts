import 'server-only'

import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'crohmnrp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number,
) {
  if (!source) return null

  let builder = imageBuilder.image(source).width(width).quality(88).auto('format')
  if (height) builder = builder.height(height).fit('crop')
  return builder.url()
}
