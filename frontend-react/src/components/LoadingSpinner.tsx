type Props = {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'inline' | 'block';
};

export default function LoadingSpinner({ size = 'md', text, variant = 'block' }: Props) {
  return (
    <div
      className={`loading-spinner ${size} ${variant === 'inline' ? 'inline' : 'block'}`}
      role="status"
      aria-live="polite"
    >
      <div className="spinner" aria-hidden="true">
        <span className="spinner-ring" />
        <span className="spinner-ring" />
        <span className="spinner-ring" />
        <span className="spinner-ring" />
      </div>
      {text ? <p className="loading-text">{text}</p> : null}
    </div>
  );
}
