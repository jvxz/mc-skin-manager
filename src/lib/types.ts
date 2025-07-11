export type SkinInputType = 'username' | 'url' | 'uuid' | 'file'

export type SkinInputTypeAsText = Exclude<SkinInputType, 'file'>

export type SkinType = 'slim' | 'classic'

interface SkinBase {
  id: string
  inputType: SkinInputType
  skinType: SkinType
  base64: string
}

interface SkinAsFile extends SkinBase {
  inputType: 'file'
}

interface SkinAsUrl extends SkinBase {
  inputType: 'url'
}

interface SkinAsUsername extends SkinBase {
  inputType: 'username'
  username: string
  uuid: string
}

interface SkinAsUuid extends SkinBase {
  inputType: 'uuid'
  uuid: string
  username: string
}

export type Skin = SkinAsFile | SkinAsUrl | SkinAsUsername | SkinAsUuid
