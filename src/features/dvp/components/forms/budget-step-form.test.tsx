import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BudgetStepForm } from "./budget-step-form";

// Mock TRPC
const mockUpdateMutation = vi.fn().mockResolvedValue({ id: "test-id" });
const mockCreateMutation = vi.fn().mockResolvedValue({ id: "new-id" });
const mockGetLatest = vi.fn();
const mockInvalidate = vi.fn();

vi.mock("~/trpc/react", () => ({
  api: {
    dvp: {
      getLatest: {
        useQuery: () => ({
          data: mockGetLatest(),
          isLoading: false,
        }),
      },
      update: {
        useMutation: () => ({
          mutateAsync: mockUpdateMutation,
          isPending: false,
        }),
      },
      create: {
        useMutation: () => ({
          mutateAsync: mockCreateMutation,
          isPending: false,
        }),
      },
    },
    useUtils: () => ({
      dvp: {
        getLatest: { invalidate: mockInvalidate }
      }
    })
  },
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("BudgetStepForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue({
      id: "test-id",
      data: { budget: { savings: 0, guarantorHelp: 0, otherIncome: 0 } }
    });
  });

  it("renders budget fields", () => {
    render(<BudgetStepForm />);
    expect(screen.getByLabelText(/Épargne totale/i)).toBeDefined();
    expect(screen.getByLabelText(/Aide mensuelle garants/i)).toBeDefined();
    expect(screen.getByLabelText(/Autres revenus/i)).toBeDefined();
  });

  it("calculates total estimated monthly resource correctly", async () => {
    render(<BudgetStepForm />);
    const savingsInput = screen.getByLabelText(/Épargne totale/i);
    const guarantorInput = screen.getByLabelText(/Aide mensuelle garants/i);
    
    await userEvent.clear(savingsInput);
    await userEvent.type(savingsInput, "5000"); // 5000 / 10 = 500
    
    await userEvent.clear(guarantorInput);
    await userEvent.type(guarantorInput, "300"); // + 300 = 800
    
    expect(await screen.findByText(/800/i)).toBeDefined();
  });

  it("submits form on button click", async () => {
    render(<BudgetStepForm />);
    const submitBtn = screen.getByRole("button", { name: /Valider et Continuer/i });
    
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateMutation).toHaveBeenCalledWith(expect.objectContaining({
        id: "test-id",
        data: expect.objectContaining({
          budget: expect.objectContaining({
            savings: 0,
            guarantorHelp: 0,
            otherIncome: 0,
          }),
        }),
      }));
    });
  });
});
