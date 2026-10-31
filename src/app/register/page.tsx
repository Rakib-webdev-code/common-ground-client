
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  Leaf,
  Users,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  photoURL: z
    .string()
    .trim()
    .url("Please enter a valid photo URL")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "Photo URL must start with http:// or https://",
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[a-z]/, "Password must have at least one lowercase letter"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        transform="translate(0 4)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.1 7.14-10.15 7.14-17.56Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.2a23.9 23.9 0 0 0 0 21.58l7.98-6.2Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.27-8.28 2.27-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.2C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

function BrandPanel() {
  return (
    <aside className="relative hidden min-h-[700px] flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 size-80 rounded-full border border-primary-foreground/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 -right-12 size-56 rounded-full border border-primary-foreground/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10">
            <Leaf className="size-6" />
          </span>
          <div>
            <p className="font-heading text-lg font-semibold tracking-[0.16em]">
              COMMON GROUND
            </p>
            <p className="mt-1 text-[10px] tracking-[0.2em] opacity-75 uppercase">
              Community starts here
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 my-12 max-w-md">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium">
          <HeartHandshake className="size-4" />
          Be part of something meaningful
        </span>

        <h2 className="font-heading text-4xl leading-[1.15] font-semibold xl:text-5xl">
          Your community.
          <br />
          Your people.
          <br />
          <span className="underline decoration-primary-foreground/40 underline-offset-8">
            Your impact.
          </span>
        </h2>

        <p className="mt-6 max-w-sm text-sm leading-7 opacity-80">
          Join people who care. Discover local initiatives, take part in
          meaningful events, and help build a stronger community together.
        </p>

        <div className="mt-9 flex items-center gap-4 border-t border-primary-foreground/20 pt-6">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Small actions matter</p>
            <p className="mt-1 text-xs opacity-75">
              Small actions. Stronger communities.
            </p>
          </div>
        </div>
      </div>

      <p className="relative z-10 text-xs tracking-wide opacity-60">
        MAKE AN IMPACT. ONE ACTION AT A TIME.
      </p>
    </aside>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { error } = await authClient.signUp.email({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        image: data.photoURL.trim(),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Welcome to Common Ground! Your account is ready.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google registration failed.");
        setIsGoogleLoading(false);
      }
    } catch {
      toast.error("Unable to connect with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 lg:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5 dark:shadow-black/20 lg:grid-cols-[1fr_0.9fr]">
        <BrandPanel />

        <div className="flex items-center justify-center px-6 py-8 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                JOIN THE COMMUNITY
              </div>

              <div>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Create your account
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Start making a difference in your community.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-border bg-background font-medium transition-colors hover:border-primary hover:bg-accent"
                onClick={handleGoogleRegister}
                disabled={isGoogleLoading || isSubmitting}
              >
                <GoogleIcon />
                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-medium tracking-wider text-muted-foreground">
                  OR REGISTER WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className="h-11 border-border bg-background focus-visible:ring-ring"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p role="alert" className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className="h-11 border-border bg-background focus-visible:ring-ring"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p role="alert" className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="photoURL">Profile photo URL</Label>
                  <Input
                    id="photoURL"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    aria-invalid={!!errors.photoURL}
                    className="h-11 border-border bg-background focus-visible:ring-ring"
                    {...register("photoURL")}
                  />
                  {errors.photoURL && (
                    <p role="alert" className="text-sm text-destructive">
                      {errors.photoURL.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      aria-invalid={!!errors.password}
                      className="h-11 border-border bg-background pr-11 focus-visible:ring-ring"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff size={18} aria-hidden="true" />
                      ) : (
                        <Eye size={18} aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p role="alert" className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="group h-11 w-full font-semibold"
                  disabled={isSubmitting || isGoogleLoading}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                  {!isSubmitting && (
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </form>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
