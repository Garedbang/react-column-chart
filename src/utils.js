export default function qs(search = '') {
  return search
    .slice(search[0] === '?' ? 1 : 0)
    .split('&')
    .reduce((map, part) => {
      const [key, value] = part.split('=');
      map[decodeURIComponent(key)] = decodeURIComponent(value);
      return map;
    }, {});
}
