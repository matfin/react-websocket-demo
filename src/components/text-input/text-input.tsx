import React from 'react';

import { InputBox } from './text-input.css';

export interface Props {
  role?: string;
  ariaLabel?: string;
  className?: string;
  value?: string;
  placeholder?: string;

  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  role = 'textbox',
  ariaLabel = 'text-input',
  className,
  onChange,
  placeholder,
  value,
}: Props): JSX.Element => (
  <InputBox
    className={className}
    aria-label={ariaLabel}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    role={role}
  />
);

export default TextInput;
