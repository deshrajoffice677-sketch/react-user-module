'use client';
import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
const requirements = [
  { regex: /.{12,}/, text: 'Minimum 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
    text: 'One special character',
  },
];
const InputPasswordValidation = ({ setOpen, password, setPassword, resetPassword }: any) => {
  const [isVisible, setIsVisible] = useState({
    first: false,
    second: false,
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showValidations, setShowValidations] = useState(false);
  const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] = useState(false);

  const id = useId();

  const strength = requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }));

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 1) return 'bg-destructive';
    if (score <= 2) return 'bg-orange-500 ';
    if (score <= 3) return 'bg-amber-500';
    if (score === 4) return 'bg-yellow-400';

    return 'bg-green-500';
  };

  const confirmPasswordMatch = (value: string) => {
    if (password !== value) {
      setIsConfirmPasswordMatch(true);
    } else {
      setIsConfirmPasswordMatch(false);
    }
  };

  const isButtonDisabled =
    isConfirmPasswordMatch ||
    strengthScore < requirements.length ||
    password.length === 0 ||
    confirmPassword.length === 0;

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Reset this User’s Password?</h2>
      <div className="space-y-2">
        <Label className="text-lg">New Password</Label>

        <div className="relative">
          <Input
            id={id}
            type={isVisible.first ? 'text' : 'password'}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={() => setShowValidations(true)}
            className="h-14 text-lg pr-12"
          />

          <button
            type="button"
            onClick={() => setIsVisible({ ...isVisible, first: !isVisible.first })}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {!isVisible.first ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      <div className="mb-2 flex h-1 w-full gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-full flex-1 rounded-full transition-all duration-500',
              index < strengthScore ? getColor(strengthScore) : 'bg-border',
            )}
          />
        ))}
      </div>
      {showValidations && (
        <ul className="mb-4 space-y-2">
          {strength.map((req, index) => (
            <li key={index} className="flex items-center gap-2">
              {req.met ? (
                <CheckIcon className="size-5 text-green-600" />
              ) : (
                <XIcon className="size-5 text-gray-400" />
              )}
              <span className={req.met ? 'text-green-600 text-sm' : 'text-gray-500 text-sm'}>
                {req.text}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="space-y-2">
        <Label className="text-lg">Confirm Password</Label>

        <div className="relative">
          <Input
            type={isVisible.second ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              confirmPasswordMatch(e.target.value);
            }}
            className="h-14 text-lg pr-12"
          />

          <button
            type="button"
            onClick={() => {
              setIsVisible({ ...isVisible, second: !isVisible.second });
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {!isVisible.second ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {isConfirmPasswordMatch && (
          <p className="text-red-600 text-sm">Confirm password does not match.</p>
        )}
      </div>
      <button
        onClick={() => {
          resetPassword();
          setOpen(false);
        }}
        disabled={isButtonDisabled}
        className={`
    w-full h-16 text-xl font-semibold rounded-xl transition
    ${
      isButtonDisabled
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer'
    }
  `}
      >
        Reset Password
      </button>
    </div>
  );
};

export default InputPasswordValidation;
