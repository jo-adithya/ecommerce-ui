import { FormHTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Input, InputProps } from '../ui/input';

type AuthFormProps = {
  method?: FormHTMLAttributes<HTMLFormElement>['method'];
  action?: FormHTMLAttributes<HTMLFormElement>['action'];
  children?: React.ReactNode;
  onSubmit?: () => void;
};

export function AuthForm({
  action,
  method,
  children,
  onSubmit,
}: AuthFormProps) {
  return (
    <form
      action={action}
      method={method}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      {children}
    </form>
  );
}

type AuthFormInputProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  errors?: string | string[];
} & InputProps;

export function AuthFormInput<T extends FieldValues>({
  name,
  label,
  type,
  errors,
  register,
  ...props
}: AuthFormInputProps<T>) {
  const errorMessage = typeof errors === 'string' ? errors : errors?.at(0);

  return (
    <label htmlFor={name} className="flex flex-col gap-2">
      {label ?? name}
      <Input id={name} type={type} {...props} {...register(name)} />
      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </label>
  );
}
