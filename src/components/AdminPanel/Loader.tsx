type LoaderProps = {
  size?: number;
  color?: string;
  classes?: string
};

export default function Loader({
  size = 40,
  color = 'border-gray-900',
  classes = ''
}: LoaderProps) {
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-4
        border-gray-200
        ${color}
        border-t-transparent 
        ${classes}
      `}
      style={{ width: size, height: size }}
    />
  );
}
