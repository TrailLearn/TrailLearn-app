import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectStepForm } from "./project-step-form";
import { act } from "react";

// Mock des hooks tRPC
const mockCreateMutation = vi.fn().mockResolvedValue({ id: "new-id" });
const mockUpdateMutation = vi.fn().mockResolvedValue({ id: "existing-id" });
const mockGetLatest = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    dvp: {
      create: {
        useMutation: () => ({
          mutateAsync: mockCreateMutation,
          isPending: false,
        }),
      },
      update: {
        useMutation: () => ({
          mutateAsync: mockUpdateMutation,
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
  },
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ProjectStepForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue(null); // Par défaut, pas de données existantes
  });

  it("renders the form fields correctly", () => {
    render(<ProjectStepForm />);
    expect(screen.getByLabelText(/Pays de destination/i)).toBeDefined();
    expect(screen.getByLabelText(/Ville cible/i)).toBeDefined();
    expect(screen.getByLabelText(/Type d'études/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Suivant/i })).toBeDefined();
  });

  it("validates required fields", async () => {
    render(<ProjectStepForm />);
    const submitBtn = screen.getByRole("button", { name: /Suivant/i });
    
    await userEvent.click(submitBtn);

    expect(await screen.findByText("Pays requis")).toBeDefined();
    expect(await screen.findByText("Ville requise")).toBeDefined();
    expect(await screen.findByText("Type d'études requis")).toBeDefined();
    expect(mockCreateMutation).not.toHaveBeenCalled();
  });

  it("autosaves on blur for city field", async () => {
    render(<ProjectStepForm />);
    const cityInput = screen.getByLabelText(/Ville cible/i);
    
    // Type into the input to make form dirty
    await userEvent.type(cityInput, "Lyon");
    
    // Wait for value to be updated
    expect(cityInput).toHaveValue("Lyon");

    // Explicitly trigger blur
    fireEvent.blur(cityInput);

    // Increase timeout and retry logic
    await waitFor(() => {
      // Check if mutation was called
      expect(mockCreateMutation).toHaveBeenCalled();
    }, { timeout: 3000 });
    
    expect(mockCreateMutation).toHaveBeenCalledWith(expect.objectContaining({
      city: "Lyon"
    }));
  });

  it("loads existing data correctly", async () => {
    mockGetLatest.mockReturnValue({
      id: "test-id",
      data: {
        country: "france",
        city: "Bordeaux",
        studyType: "master"
      }
    });

    await act(async () => {
      render(<ProjectStepForm />);
    });
    
    expect(screen.getByDisplayValue("Bordeaux")).toBeDefined();
  });
});