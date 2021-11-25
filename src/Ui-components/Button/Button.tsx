import styles from './button.module.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  secondary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  outline?: boolean;
  type?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  secondary = false,
  outline = false,
  size = 'medium',
  backgroundColor,
  label,
  type,
  ...props
}: ButtonProps) => {
  const mode = outline
    ? 'storybook-button--outline'
    : primary
    ? 'storybook-button--primary'
    : secondary
    ? 'storybook-button--secondary'
    : '';

  return (
    <button
      type={type}
      className={`${styles['storybook-button']}
        ${styles[`storybook-button--${size}`]} ${styles[mode]}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
