import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export enum SelectList {
  TYPES = 'types',
  POKEMONS = 'pokemons',
  STATS = 'stats',
}
