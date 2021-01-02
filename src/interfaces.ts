export interface IKeyValue {
  key: string,
  value: string,
}

export interface IPost {
  _id: string,
  title: string,
  category: string,
  tags: Array<string>,
  content: string,
  created_at: string,
}

export interface ISlide {
  imgUrls: Array<string>,
  imgCaptions: string,
}