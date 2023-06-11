export default function trim(str: string, chars: string = ' '): string {
  const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
  return str.replace(regex, '');
}
