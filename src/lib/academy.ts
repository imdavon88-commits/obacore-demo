export const LESSONS = [
  {
    slug: "what-is-crypto",
    title: "What is crypto, in plain English",
    minutes: 3,
    body: [
      "Crypto assets like Bitcoin (BTC), Ethereum (ETH), and USDT are digital assets you can buy with U.S. dollars.",
      "ObaCore Capital Lite is an in-development mobile app. You see a fee before you confirm. Nothing here moves real money.",
      "You do not need a trader terminal to understand a first buy. Read the receipt and ask questions.",
    ],
    takeaway: "Know what you are buying and what you paid — before you confirm.",
  },
  {
    slug: "fees-and-spreads",
    title: "Fees, spreads, and the receipt",
    minutes: 3,
    body: [
      "Every quote shows three numbers: the mid market price, a small spread, and a dollar fee.",
      "The spread is how the app would be paid on a trade. The dollar fee covers operations on small tickets.",
      "Your receipt records what you saw and what was booked in this simulated wallet. Keep receipts. They are your record.",
    ],
    takeaway: "If the fee is not on the screen before confirm, do not proceed — here or anywhere else.",
  },
  {
    slug: "first-buy",
    title: "Your first simulated buy",
    minutes: 2,
    body: [
      "Pick BTC, ETH, or USDT. Enter a dollar amount you are comfortable practicing with — a practice amount, like $25.",
      "Review mid price, spread, fee, and net. Confirm only if the numbers make sense to you.",
      "This Academy is not financial advice. It teaches the path. You decide the size.",
    ],
    takeaway: "Practice the path. This demo uses sample data only. No real funds.",
    cta: { href: "/buy?amount=25", label: "Try a $25 simulated first buy" },
  },
] as const;

export type LessonSlug = (typeof LESSONS)[number]["slug"];
