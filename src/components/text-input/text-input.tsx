import React from 'react';

import { Container, InputBox, Label } from './text-input.css';

export interface Props {
  id: string;
  label?: string;
  className?: string;
  value?: string;
  placeholder?: string;

  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  id,
  label = 'Text input',
  className,
  onChange,
  placeholder,
  value,
}: Props): JSX.Element => (
  <Container className={className}>
    <Label htmlFor={id}>{label}</Label>
    <InputBox id={id} onChange={onChange} placeholder={placeholder} value={value} />
  </Container>
);

export default TextInput;
