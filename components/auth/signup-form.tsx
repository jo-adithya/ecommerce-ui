'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { signUpApi } from '@/api/auth.api';
import { SignUpData, SignUpSchema } from '@/lib/schemas';

import { SubmitButton } from '../ui/submit-button.client';
import { AuthForm, AuthFormInput } from './auth-form';

export function SignUpForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch: _watch,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    const response = await signUpApi(data.email, data.password);
    if (!response.ok) {
      if (typeof response.error.message === 'string') {
        setFormError(response.error.message);
      } else if (Array.isArray(response.error.message)) {
        setFormError(response.error.message[0]);
      } else {
        setFormError('An error occurred');
      }
      return;
    }
    router.push('/signin');
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      {formError && (
        <div className="px-4 py-2 mb-2 rounded-lg border border-red-400 bg-red-100">
          <p className="text-red-400">{formError}</p>
        </div>
      )}

      <h1 className="text-3xl mb-6 font-medium">Sign up</h1>

      <AuthFormInput<SignUpData>
        label="Email"
        name="email"
        type="text"
        errors={errors.email?.message as string}
        register={register}
      />
      <AuthFormInput<SignUpData>
        label="Password"
        name="password"
        type="password"
        errors={errors.password?.message as string}
        register={register}
      />
      <SubmitButton className="mt-4">Sign Up</SubmitButton>
    </AuthForm>
  );
}
