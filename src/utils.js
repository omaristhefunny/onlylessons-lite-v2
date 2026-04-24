function toIPv4(ip) {
  if (!ip) return '127.0.0.1';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
  return ip.match(/^(\d{1,3}\.){3}\d{1,3}$/) ? ip : '127.0.0.1';
}

export {
    toIPv4
}