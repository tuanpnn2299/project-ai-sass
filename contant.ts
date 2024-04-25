import { ToolItemProps } from "./components/dashboard/tool-item";

export const MAX_FREE_COUNTS = 100;

export const THEME_MODES = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

export const TOOLS: ToolItemProps[] = [
  {
    title: "Conversation",
    url: "/conversation",
    icon: "/icons/conversation.svg",
    slug: "conversation",
    color: "bg-blue-500",
  },
  {
    title: "Code",
    url: "/code",
    icon: "/icons/code.svg",
    slug: "code",
    color: "bg-yellow-500",
  },
  {
    title: "Video",
    url: "/video",
    icon: "/icons/video.svg",
    slug: "video",
    color: "bg-pink-500",
  },
  {
    title: "Photo",
    url: "/photo",
    icon: "/icons/photo.svg",
    slug: "photo",
    color: "bg-purple-500",
  },
  {
    title: "Audio",
    url: "/audio",
    icon: "/icons/audio.svg",
    slug: "audio",
    color: "bg-red-500",
  },
];

export const NAVIGATIONS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "/icons/dashboard.svg",
  },
  ...TOOLS,
];

export const DAY_IN_MS = 86_400_000;

export const PHOTO_AMOUNT_OPTIONS = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const PHOTO_RESOLUTION_OPTIONS = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];
