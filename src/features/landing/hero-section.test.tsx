import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "./components/hero-section";

// Mock next/link
vi.mock("next/link", () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  };
});

// Mock next-auth/auth
vi.mock("~/server/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

// Helper to render async server components
async function renderAsync(component: any) {
  const jsx = await component();
  return render(jsx);
}

describe("HeroSection Component", () => {
  it("renders main title and CTA", async () => {
    await renderAsync(HeroSection);
    
    // Titre
    expect(screen.getByText(/Lucidité/i)).toBeInTheDocument();
    
    // CTA
    expect(screen.getByRole("button", { name: /Commencer mon DVP/i })).toBeInTheDocument();
  });
});
