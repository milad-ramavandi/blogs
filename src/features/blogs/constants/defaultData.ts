import { IBlogTab, IBlogTag } from "../types";

export const tabs: IBlogTab[] = [
  { label: "All", value: "all" },
  { label: "Crypto News", value: "crypto-news", id: "6" },
  { label: "Featured", value: "featured", id: "2" },
  { label: "Hot Picks", value: "hot-picks", id: "5" },
  { label: "Trends", value: "trends", id: "4" },
  { label: "Watch", value: "watch", id: "3" },
];

export const tagsList: IBlogTag[] = [
  { id: "8", label: "# blockchain" },
  { id: "9", label: "# Business" },
  { id: "10", label: "# Bitcoin" },
  { id: "11", label: "# Bitcoin ETF" },
  { id: "12", label: "# Economics" },
  { id: "13", label: "# Adoption" },
  { id: "16", label: "# testapi" },
  { id: "48", label: "# Trading" },
  { id: "49", label: "# Altseason" },
];
