
'use client';

import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const requirements = [
  { regex: /.{8,}/, text: 'Minimum 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  {
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    text: 'One special character',
  },
];

type Props = {
  setOpen: (v: boolean) => void;
  password: string;
  setPassword: (v: string) => void;
  resetPassword: () => void;
};

export default function InputPasswordValidation({
  setOpen,
  password,
  setPassword,
  resetPassword,
}: Props) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [visible, setVisible] = useState({ first: false, second: false });

  const id = useId();

  const strength = useMemo(
    () =>
      requirements.map((req) => ({
        met: req.regex.test(password),
        text: req.text,
      })),
    [password],
  );

  const strengthScore = strength.filter((r) => r.met).length;

  const isPasswordValid = strengthScore === requirements.length;
  const isConfirmValid =
    confirmPassword.length > 0 && confirmPassword === password;

  const canSubmit = isPasswordValid && isConfirmValid;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-900">
        Reset this User’s Password?
      </h2>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900">
          Enter New Password
        </Label>

        {showRules && <div className="flex justify-end">
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={cn(
                  'h-1 w-6 rounded-full',
                  strengthScore === 0
                    ? 'bg-gray-200'
                    : strengthScore <= 1
                      ? level === 1
                        ? 'bg-red-500'
                        : 'bg-gray-200'
                      : strengthScore <= 2
                        ? level <= 2
                          ? 'bg-orange-400'
                          : 'bg-gray-200'
                        : 'bg-green-500',
                )}
              />
            ))}
          </div>
        </div>
        }
        <div className="relative">
          <Input
            id={id}
            type={visible.first ? 'text' : 'password'}
            placeholder="Enter new password"
            value={password}
            aria-invalid={password.length > 0 && !isPasswordValid}
            onChange={(e) => {
              setPassword(e.target.value);
              setShowRules(true);
            }}
            className="
              h-12 pr-12 bg-white
              aria-invalid:border-red-400
              aria-invalid:focus-visible:ring-red-200
            "
          />

          <button
            type="button"
            onClick={() =>
              setVisible((v) => ({ ...v, first: !v.first }))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {visible.first ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
          </button>
        </div>
      </div>

      {showRules && (
        <ul className="space-y-2">
          {strength.map((req, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              {req.met ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <XIcon className="w-4 h-4 text-red-500" />
              )}
              <span
                className={req.met ? 'text-green-600' : 'text-red-600'}
              >
                {req.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-900">
          Confirm Password
        </Label>

        <div className="relative">
          <Input
            type={visible.second ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            aria-invalid={
              confirmPassword.length > 0 && !isConfirmValid
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              h-12 pr-12 bg-white
              aria-invalid:border-red-400
              aria-invalid:focus-visible:ring-red-200
            "
          />

          <button
            type="button"
            onClick={() =>
              setVisible((v) => ({ ...v, second: !v.second }))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {visible.second ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
          </button>
        </div>

        {confirmPassword.length > 0 && !isConfirmValid && (
          <p className="text-sm text-red-600">
            Confirm password does not match
          </p>
        )}
      </div>

      <button
        disabled={!canSubmit}
        onClick={() => {
          if (!canSubmit) return;
          resetPassword();
          setOpen(false);
          setConfirmPassword(""); setPassword("");
        }}
        className={cn(
          'w-full h-12 rounded-lg text-sm font-semibold transition',
          canSubmit
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed',
        )}
      >
        Reset Password
      </button>
    </div>
  );
}
