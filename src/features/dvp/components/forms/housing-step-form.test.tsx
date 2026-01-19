import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HousingStepForm } from "./housing-step-form";

// Mock TRPC
const mockUpdateMutation = vi.fn().mockResolvedValue({ id: "test-id" });
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

describe("HousingStepForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue({
      id: "test-id",
      data: { housing: { type: "", cost: 0 } }
    });
  });

  it("renders fields", () => {
    render(<HousingStepForm />);
    expect(screen.getByLabelText(/Type de logement/i)).toBeDefined();
    expect(screen.getByLabelText(/Loyer estimé/i)).toBeDefined();
  });

  it("shows price range feedback when type is selected", async () => {
    // Override mock for this test to simulate Paris
    mockGetLatest.mockReturnValue({
      id: "test-id",
      data: { city: "Paris", housing: { type: "", cost: 0 } }
    });

    render(<HousingStepForm />);
    
    // Select type
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    const option = await screen.findByRole("option", { name: /Colocation/i });
    await userEvent.click(option);

    expect(await screen.findByText(/Prix moyen/i)).toBeDefined();
  });

  it("submits form on button click", async () => {
    render(<HousingStepForm />);
    
    // Select type
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    const option = await screen.findByRole("option", { name: /Colocation/i });
    await userEvent.click(option);

    const costInput = screen.getByLabelText(/Loyer estimé/i);
    await userEvent.type(costInput, "500");

    const submitBtn = screen.getByRole("button", { name: /Valider et Continuer/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateMutation).toHaveBeenCalledWith(expect.objectContaining({
        id: "test-id",
        data: expect.objectContaining({
          housing: expect.objectContaining({
            type: "coloc",
            cost: 500,
          }),
        }),
      }));
    });
  });
});