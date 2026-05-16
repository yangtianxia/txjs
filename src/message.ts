import extend from 'extend'
import type { ExtractPropOf } from './types'

type MessageType = string | string[]

interface BaseMessage {
  default: MessageType
}

type MessageOption = Record<string, MessageType> & BaseMessage

export type MessageObject = Record<string, MessageOption>

export class Message<T extends MessageObject> {
  #defaults: T

  constructor(config: T) {
    this.#defaults = config
  }

  get value() {
    return this.#defaults
  }

  hasItem<K extends keyof T>(name: K) {
    return name in this.value
  }

  getItem<K extends keyof T>(name: K): T[K]
  getItem<K extends keyof T, F extends ExtractPropOf<T, K>>(
    name: K,
    template: F
  ): T[K][F]
  getItem<K extends keyof T, F extends string>(name: K, template: F): T[K][F]
  getItem<K extends keyof T>(name: K, template?: any): any {
    return template ? this.value[name][template] : this.value[name]
  }
}

export function createMessage<T extends MessageObject>(...sources: T[]) {
  return new Message<T>(extend(true, ...sources))
}
