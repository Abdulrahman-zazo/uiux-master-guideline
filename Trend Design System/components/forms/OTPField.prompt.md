Six-box OTP entry with SMS autofill (`autocomplete="one-time-code"`). Always LTR — digits never mirror.

```jsx
<OTPField value={code} onChange={setCode} onComplete={verify} invalid={err === 'auth.otp_invalid'} autoFocus />
<RateLimitTimer seconds={300} label="ينتهي الرمز خلال" />
<RateLimitTimer seconds={60} label="إعادة الإرسال بعد" onDone={enableResend} />
```

Pair with two `RateLimitTimer`s (300 s expiry, 60 s resend) and show the attempt counter after the third failure.
