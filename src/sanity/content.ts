import 'server-only'

import type {AboutIcon, ShortCategory, VideoItem, WorkCategory} from '@/data/content'
import {getCopy, type Locale, type SiteCopy} from '@/data/translations'
import type {SITE_CONTENT_QUERY_RESULT} from './sanity.types'
import {sanityClient} from './client'
import {getImageUrl} from './image'
import {SITE_CONTENT_QUERY} from './queries'

type LocalizedValue = {ru?: string | null; en?: string | null} | null

const workCategories: Record<string, WorkCategory> = {
  youtube: 'YouTube',
  commercial: 'Реклама',
  podcast: 'Подкасты',
}

const shortCategories: Record<string, ShortCategory> = {
  shorts: 'Shorts',
  reels: 'Reels',
}

function localize(value: LocalizedValue, locale: Locale, fallback: string) {
  const preferred = locale === 'en' ? value?.en : value?.ru
  return preferred?.trim() || value?.ru?.trim() || fallback
}

function getYoutubeId(value: string | null): string | null {
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.hostname === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] ?? null

    if (url.hostname.endsWith('youtube.com')) {
      const pathId = url.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1]
      return pathId ?? url.searchParams.get('v')
    }
  } catch {
    return null
  }

  return null
}

function getVideoSource(url: string | null): VideoItem['source'] {
  const id = getYoutubeId(url)
  return id ? {kind: 'youtube', id} : null
}

function mapProfileItems(
  items: NonNullable<NonNullable<SITE_CONTENT_QUERY_RESULT['profile']>['skills']>,
): AboutIcon[] {
  return items.flatMap((item) => {
    const src = getImageUrl(item.icon, 96, 96)
    return item.name && src ? [{name: item.name, src}] : []
  })
}

function mapContent(data: SITE_CONTENT_QUERY_RESULT, locale: Locale): SiteCopy {
  const fallback = getCopy(locale)
  const showreel = data.showreel
    ? {
        ...fallback.showreel,
        id: data.showreel._id,
        title: localize(data.showreel.title, locale, fallback.showreel.title),
        description: localize(
          data.showreel.description,
          locale,
          fallback.showreel.description,
        ),
        source: data.showreel.isVisible === false ? null : getVideoSource(data.showreel.youtubeUrl),
        poster:
          data.showreel.isVisible === false ? null : getImageUrl(data.showreel.poster, 1600, 900),
      }
    : fallback.showreel

  const works: VideoItem[] = data.works.map((item) => ({
    id: item._id,
    title: localize(item.title, locale, fallback.ui.videoPlaceholder),
    description: localize(item.description, locale, ''),
    category: workCategories[item.category ?? ''] ?? 'YouTube',
    duration: null,
    source: getVideoSource(item.youtubeUrl),
    poster: getImageUrl(item.poster, 960, 540),
    orientation: 'landscape',
  }))

  const shorts: VideoItem[] = data.shorts.map((item) => ({
    id: item._id,
    title: localize(item.title, locale, fallback.ui.videoPlaceholder),
    description: localize(item.description, locale, ''),
    category: shortCategories[item.category ?? ''] ?? 'Shorts',
    duration: null,
    source: getVideoSource(item.youtubeUrl),
    poster: getImageUrl(item.poster, 600, 1067),
    orientation: 'portrait',
  }))

  const about = data.profile
    ? {
        text: localize(data.profile.aboutText, locale, fallback.about.text ?? ''),
        portrait: getImageUrl(data.profile.portrait, 824, 1030),
        skills: mapProfileItems(data.profile.skills ?? []),
        tools: mapProfileItems(data.profile.tools ?? []),
        platforms: mapProfileItems(data.profile.platforms ?? []),
      }
    : {...fallback.about, portrait: '/media/alexey.jpg'}

  const reviews = data.reviews.map((review) => {
    const avatar = getImageUrl(review.avatar, 72, 72)
    return {
      id: review._id,
      quote: localize(review.quote, locale, ''),
      author: localize(review.author, locale, fallback.ui.client),
      detail: review.detail ? localize(review.detail, locale, '') || null : null,
      url: review.sourceUrl,
      ...(avatar ? {avatar} : {}),
    }
  })

  return {...fallback, showreel, works, shorts, about, reviews}
}

export async function getSiteCopy(locale: Locale): Promise<SiteCopy> {
  try {
    const data = await sanityClient.fetch(SITE_CONTENT_QUERY)
    return mapContent(data, locale)
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error
    console.warn('Sanity is unavailable; using local development content.', error)
    return getCopy(locale)
  }
}
