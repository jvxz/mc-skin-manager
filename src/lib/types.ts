export type SkinInputType = 'username' | 'url' | 'uuid' | 'file'

export type SkinInputTypeAsText = Exclude<SkinInputType, 'file'>

export type SkinType = 'slim' | 'classic'

interface SkinBase {
  id: string
  inputType: SkinInputType
  skinType: SkinType
}

interface SkinAsFile extends SkinBase {
  file: File
  inputType: 'file'
}

interface SkinAsUrl extends SkinBase {
  skinUrl: string
  inputType: 'url'
}

interface SkinAsUsername extends SkinBase {
  skinUrl: string
  inputType: 'username'
  username: string
  uuid: string
}

interface SkinAsUuid extends SkinBase {
  skinUrl: string
  inputType: 'uuid'
  uuid: string
  username: string
}

export type Skin = SkinAsFile | SkinAsUrl | SkinAsUsername | SkinAsUuid
