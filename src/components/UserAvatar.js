export default function UserAvatar({ src, alt, size = 32 }) {
  return <img src={src} alt={alt} width={size} height={size} style={{ borderRadius: '50%' }} />;
}