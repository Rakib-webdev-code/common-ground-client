
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Loader2,
  Pencil,
  Save,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "@/components/layout/user-avatar";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login?callbackURL=/profile");
    }
  }, [isPending, user, router]);

  const validateImageUrl = (value: string) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  const handleEdit = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(false);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (trimmedName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (trimmedName.length > 50) {
      toast.error("Name cannot exceed 50 characters.");
      return;
    }

    if (!validateImageUrl(trimmedImageUrl)) {
      toast.error("Please enter a valid HTTP or HTTPS photo URL.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImageUrl || null,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      setIsEditing(false);
      toast.success("Your profile has been updated successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-muted" />

          <div className="rounded-3xl border border-border p-8">
            <div className="size-24 rounded-full bg-muted" />
            <div className="mt-6 h-5 w-40 rounded bg-muted" />
            <div className="mt-3 h-4 w-56 rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-background px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Your Account
          </p>

          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            View and manage your personal information.
          </p>
        </div>

        <section className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="border-b border-border bg-primary/5 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <UserAvatar
                name={user.name || user.email}
                image={user.image}
                className="size-24 border-2 border-primary/30 text-2xl"
              />

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-heading text-2xl font-bold text-foreground">
                  {user.name || "Common Ground Member"}
                </h2>

                <p className="mt-2 break-all text-sm text-muted-foreground">
                  {user.email}
                </p>

                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <UserRound size={13} aria-hidden="true" />
                  Community Member
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your account information.
              </p>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="profile-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name
                  </label>

                  <input
                    id="profile-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={50}
                    required
                    disabled={isSaving}
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="profile-image"
                    className="text-sm font-medium text-foreground"
                  >
                    Profile Photo URL
                  </label>

                  <input
                    id="profile-image"
                    type="url"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    disabled={isSaving}
                    placeholder="https://example.com/photo.jpg"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  />

                  <p className="text-xs leading-5 text-muted-foreground">
                    Enter an HTTP or HTTPS image URL. Leave empty to remove
                    your current photo.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}

                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Full Name
                    </p>

                    <p className="mt-2 break-words text-sm font-medium text-foreground">
                      {user.name || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address
                    </p>

                    <p className="mt-2 break-all text-sm font-medium text-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Profile Photo
                    </p>

                    <p className="mt-2 break-all text-sm font-medium text-foreground">
                      {user.image ? "Profile photo added" : "No profile photo"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Pencil size={16} aria-hidden="true" />
                    Edit Profile
                    <Camera size={16} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
