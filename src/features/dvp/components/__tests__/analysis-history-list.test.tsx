import { render, screen } from "@testing-library/react";
import { AnalysisHistoryList } from "../analysis-history-list";
import { vi, describe, it, expect } from "vitest";

// Mock the tRPC hook
const mockGetHistory = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    dvp: {
      getHistory: {
        useQuery: () => mockGetHistory(),
      },
    },
  },
}));

// Mock Lucide icons
vi.mock("lucide-react", () => ({
  History: () => <div data-testid="icon-history" />,
  Calendar: () => <div data-testid="icon-calendar" />,
  Clock: () => <div data-testid="icon-clock" />,
  CheckCircle: () => <div data-testid="icon-check" />,
  AlertCircle: () => <div data-testid="icon-alert" />,
}));

// Mock Skeleton
vi.mock("~/components/ui/skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));

describe("AnalysisHistoryList", () => {
  it("renders loading state", () => {
    mockGetHistory.mockReturnValue({ data: undefined, isLoading: true });
    render(<AnalysisHistoryList />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);
  });

  it("renders empty state", () => {
    mockGetHistory.mockReturnValue({ data: [], isLoading: false });
    render(<AnalysisHistoryList />);
    expect(screen.getByText(/Aucune analyse précédente/i)).toBeInTheDocument();
  });

  it("renders history items", () => {
    const mockData = [
      {
        id: "1",
        createdAt: new Date("2026-01-01T10:00:00Z"),
        status: "COMPLETED",
        rulesVersion: "1.0",
        calculationResult: { status: "GREEN", score: 85, findings: [] },
      },
    ];
    mockGetHistory.mockReturnValue({ data: mockData, isLoading: false });
    
    render(<AnalysisHistoryList />);
    
    // Check for date (flexible check because of locale/timezone)
    // 1 January 2026
    expect(screen.getByText(/janvier 2026/i)).toBeInTheDocument();
    
    // Check status
    expect(screen.getByText(/Validé/i)).toBeInTheDocument();
    
    // Check score
    expect(screen.getByText(/Score: 85/i)).toBeInTheDocument();
  });
});
