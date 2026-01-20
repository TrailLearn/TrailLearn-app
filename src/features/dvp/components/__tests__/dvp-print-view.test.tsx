import { render, screen } from "@testing-library/react";
import { DvpPrintView } from "../dvp-print-view";
import { vi, describe, it, expect } from "vitest";

// Mock TRPC
const mockGetById = vi.fn();
vi.mock("~/trpc/react", () => ({
  api: {
    dvp: {
      getById: {
        useQuery: () => mockGetById(),
      },
    },
  },
}));

vi.mock("lucide-react", () => ({
  MapPin: () => <div data-testid="icon-map" />,
  School: () => <div data-testid="icon-school" />,
  User: () => <div data-testid="icon-user" />,
  ShieldCheck: () => <div data-testid="icon-shield" />,
  Calendar: () => <div data-testid="icon-calendar" />,
  CheckCircle2: () => <div data-testid="icon-check" />,
  AlertCircle: () => <div data-testid="icon-alert-circle" />,
  AlertTriangle: () => <div data-testid="icon-alert-triangle" />,
  Eye: () => <div data-testid="icon-eye" />,
  Printer: () => <div data-testid="icon-printer" />,
  XCircle: () => <div data-testid="icon-x-circle" />,
}));

describe("DvpPrintView", () => {
  it("renders loading state", () => {
    mockGetById.mockReturnValue({ data: undefined, isLoading: true });
    render(<DvpPrintView dvpId="1" />);
    expect(screen.getByText(/Chargement du document/i)).toBeInTheDocument();
  });

  it("renders document data", () => {
    const mockData = {
      id: "dvp-123",
      status: "COMPLETED",
      createdAt: new Date("2026-01-01"),
      rulesVersion: "1.0",
      user: { name: "Alice", email: "alice@test.com" },
      data: {
        city: "Paris",
        country: "France",
        studyType: "Master",
        budget: { savings: 5000 },
      },
      calculationResult: {
        status: "GREEN",
        score: 90,
        findings: [],
      },
    };

    mockGetById.mockReturnValue({ data: mockData, isLoading: false });
    render(<DvpPrintView dvpId="1" />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
    expect(screen.getByText("CERTIFIÉ")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
  });
});
