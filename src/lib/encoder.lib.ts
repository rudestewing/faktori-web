import { encode, decode } from 'js-base64'

export function safeBase64Encode(input: string): string {
  return encode(input)
}

export function safeBase64Decode(input: string): string {
  return decode(input)
}
