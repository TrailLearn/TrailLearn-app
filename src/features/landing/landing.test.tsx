import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LandingPage from "../../app/page";
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

// Mock child components for integration test to avoid async rendering issues in JSDOM
vi.mock("./components/hero-section", () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section Mock</div>,
}));

vi.mock("./components/vision-section", () => ({
  VisionSection: () => <div data-testid="vision-section">Vision Section Mock</div>,
}));

// Helper to render async server components
async function renderAsync(component: any) {
  const jsx = await component();
  return render(jsx);
}

describe("Landing Page Components", () => {
  // Test d'intégration simplifié (Structure)
  it("LandingPage integration renders header, footer and sections", async () => {
    await renderAsync(LandingPage);

    // Header
    expect(screen.getByText("TrailLearn")).toBeInTheDocument();
    expect(screen.getByText("Se connecter")).toBeInTheDocument();

    // Sections mocked
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("vision-section")).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/Responsabilité Structurelle/i)).toBeInTheDocument();
  });
});
