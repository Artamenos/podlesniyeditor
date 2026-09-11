import {defineQuery} from 'groq'

export const SITE_CONTENT_QUERY = defineQuery(`{
  "showreel": *[_id == "showreel" && _type == "showreel"][0]{
    _id,
    title,
    description,
    youtubeUrl,
    poster,
    isVisible
  },
  "works": *[_type == "videoProject" && isVisible != false] | order(order asc, _createdAt asc){
    _id,
    title,
    description,
    youtubeUrl,
    poster,
    category
  },
  "shorts": *[_type == "shortVideo" && isVisible != false] | order(order asc, _createdAt asc){
    _id,
    title,
    description,
    youtubeUrl,
    poster,
    category
  },
  "profile": *[_id == "profile" && _type == "profile"][0]{
    aboutText,
    portrait,
    skills[]{_key, name, icon},
    tools[]{_key, name, icon},
    platforms[]{_key, name, icon}
  },
  "reviews": *[_type == "review" && isVisible != false] | order(order asc, _createdAt asc){
    _id,
    quote,
    author,
    detail,
    avatar,
    sourceUrl
  }
}`)
