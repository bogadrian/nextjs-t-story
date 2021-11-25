import styles from './input.module.css';

interface Props {
  handleChange: (event: any) => void;
  label: string;
  value: string;
  type: string;
  size: string;
  invalid?: boolean;
}

export const Input: React.FC<Props> = ({
  handleChange,
  label,
  value,
  size,
  type,
  invalid
}) => {
  return (
    <div className={`${styles['group']} ${styles[`group-${size}`]}`}>
      <input
        type={type}
        className={`${styles[`form-input`]} ${styles[`form-input-${size}`]}`}
        onChange={handleChange}
        style={invalid ? { borderBottom: '1px solid red' } : {}}
      />
      {label ? (
        <label
          className={`${value?.length > 0 ? styles['shrink'] : ''} ${
            styles[`form-input-label`]
          } ${styles[`form-input-label-${size}`]}`}
          style={invalid ? { color: 'red' } : {}}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};
