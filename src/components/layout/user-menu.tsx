"use client";

import { useRouter } from "next/navigation";
import { Menu } from "@base-ui/react/menu";
import {
  CalendarCheck,
  CalendarCog,
  CalendarPlus,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { UserAvatar } from "./user-avatar";

const accountLinks = [
  { href: "/events/create", label: "Create Event", icon: CalendarPlus },
  { href: "/events/manage", label: "Manage Events", icon: CalendarCog },
  { href: "/events/joined", label: "Joined Events", icon: CalendarCheck },
] as const;

type UserMenuProps = {
  name: string;
  email: string;
  image?: string | null;
};

type AccountLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

function AccountLink({ href, label, icon: Icon }: AccountLinkProps) {
  const router = useRouter();

  return (
    <Menu.Item
      onClick={() => router.push(href)}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
    >
      <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
      {label}
    </Menu.Item>
  );
}

export function UserMenu({ name, email, image }: UserMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={`Open account menu for ${name}`}
        className="group/avatar relative flex cursor-pointer items-center gap-1.5 rounded-full p-0.5 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <UserAvatar
          name={name}
          image={image}
          className="size-9 ring-2 ring-primary/60 ring-offset-2 ring-offset-card"
        />

        <ChevronDown
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-transform group-data-[popup-open]/avatar:rotate-180"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-full left-1/2 z-50 mt-3 max-w-48 -translate-x-1/2 truncate rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-popover-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100 group-data-[popup-open]/avatar:opacity-0"
        >
          {name}
        </span>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={10} align="end" className="z-50">
          <Menu.Popup className="w-64 origin-[var(--transform-origin)] rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <div className="px-3 py-2.5">
              <p className="truncate font-heading text-base font-semibold text-popover-foreground">
                {name}
              </p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>

            <Menu.Separator className="my-1 h-px bg-border" />

            <div className="space-y-0.5">
              {accountLinks.map((link) => (
                <AccountLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}