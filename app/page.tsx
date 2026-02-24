import MatchaCanvasAnimation from "@/components/MatchaCanvasAnimation";

export const metadata = {
  title: "Artisanal Iced Matcha Latte",
  description: "Experience the perfect harmony of shade-grown ceremonial matcha and velvet dairy.",
};

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-[#D4E0D1]/30 selection:text-white min-h-screen font-sans">
      <MatchaCanvasAnimation />
    </main>
  );
}
