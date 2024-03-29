export function toHexString(value: string): string {
  return value
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export function fromHexString(hexString: string): string {
  return (
    hexString
      .match(/.{1,2}/g)
      ?.map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join('') ?? ''
  );
}
