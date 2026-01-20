import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { SummaryView } from "./summary-view";

// Mock tRPC
const mockUpdateMutation = vi.fn().mockResolvedValue({ id: "test-id" });
const mockSubmitMutation = vi.fn().mockResolvedValue({ id: "test-id" });
const mockGetLatest = vi.fn();

const mockInvalidate = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    dvp: {
      update: {
        useMutation: () => ({
          mutateAsync: mockUpdateMutation,
          isPending: false,
        }),
      },
      submit: {
        useMutation: () => ({
          mutateAsync: mockSubmitMutation,
          isPending: false,
        }),
      },
      getLatest: {
        useQuery: () => ({
          data: mockGetLatest(),
          isLoading: false,
        }),
      },
    },
    useUtils: () => ({
      dvp: {
        getLastSnapshot: { invalidate: mockInvalidate },
        getLatest: { invalidate: mockInvalidate },
      }
    }),
  },
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SummaryView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue(null);
  });

  it("renders summary sections", () => {
    render(<SummaryView />);
    expect(screen.getByText(/Projet/i)).toBeDefined();
    expect(screen.getByText(/Budget/i)).toBeDefined();
    expect(screen.getByText(/Logement/i)).toBeDefined();
    expect(screen.getByText(/Langue/i)).toBeDefined();
  });

  it("disables validate button if incomplete", async () => {
    mockGetLatest.mockReturnValue({
      data: { city: "Paris" } // Missing other fields
    });

    render(<SummaryView />);
    
    const button = screen.getByRole("button", { name: /Valider mon dossier/i });
    expect(button).toBeDisabled();
  });

  it("enables validate button if complete", async () => {
    mockGetLatest.mockReturnValue({
      data: { 
        city: "Paris", country: "France", studyType: "Master",
        budget: { savings: 1000 },
        housing: { type: "coloc", cost: 500 },
        language: { level: "B2" },
        stepStatus: {
          project: "VALIDATED",
          budget: "VALIDATED",
          housing: "VALIDATED",
          language: "VALIDATED"
        }
      }
    });

    render(<SummaryView />);
    
    const button = screen.getByRole("button", { name: /Valider mon dossier/i });
    expect(button).not.toBeDisabled();
  });
});
