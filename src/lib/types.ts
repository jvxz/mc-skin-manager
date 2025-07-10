export type SkinType = 'username' | 'url' | 'uuid' | 'file'

export type SkinTypeAsText = Exclude<SkinType, 'file'>

interface SkinBase {
  id: string
  type: SkinType
}

interface SkinAsFile extends SkinBase {
  file: File
  type: 'file'
}

interface SkinAsUrl extends SkinBase {
  skinUrl: string
  type: 'url'
}

interface SkinAsUsername extends SkinBase {
  skinUrl: string
  type: 'username'
  username: string
  uuid: string
}

interface SkinAsUuid extends SkinBase {
  skinUrl: string
  type: 'uuid'
  uuid: string
  username: string
}

export type Skin = SkinAsFile | SkinAsUrl | SkinAsUsername | SkinAsUuid
