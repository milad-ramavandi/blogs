import { IBlogTab, IBlogTag } from "../types";

export const tabs: IBlogTab[] = [
  { label: "All", value: "all" },
  { label: "Crypto News", value: "crypto-news", id: "6" },
  { label: "Main", value: "main", id: "2" },
  { label: "Popular Posts", value: "popular", id: "5" },
  { label: "Top Videos", value: "video", id: "3" },
  { label: "Trend", value: "trend", id: "4" },
];

export const tagsList: IBlogTag[] = [
  { id: "8", label: "# blockchain" },
  { id: "9", label: "# Business" },
  { id: "10", label: "# Bitcoin" },
  { id: "11", label: "# Bitcoin ETF" },
  { id: "12", label: "# Economics" },
  { id: "13", label: "# Adoption" },
  { id: "16", label: "# testapi" },
];
