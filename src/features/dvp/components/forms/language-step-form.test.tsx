import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageStepForm } from "./language-step-form";

// Mock tRPC
const mockUpdateMutation = vi.fn().mockResolvedValue({ id: "test-id" });
const mockCreateMutation = vi.fn().mockResolvedValue({ id: "new-id" });
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
      create: {
        useMutation: () => ({
          mutateAsync: mockCreateMutation,
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

describe("LanguageStepForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue({
      id: "test-id",
      status: "DRAFT",
      data: { language: { level: "" } }
    });
  });

  it("renders level select", () => {
    render(<LanguageStepForm />);
    expect(screen.getByText(/Niveau de langue/i)).toBeDefined();
  });

  it.skip("shows warning for levels < B2", async () => {
    mockGetLatest.mockReturnValue({
      id: "test-id",
      status: "DRAFT",
      data: { language: { level: "A2" } }
    });

    render(<LanguageStepForm />);
    
    // Wait for the form to reset and the warning to appear
    await waitFor(() => {
        expect(screen.getByText(/Attention/i)).toBeDefined();
    });
    expect(screen.getByText(/niveau B2 minimum/i)).toBeDefined();
  });

  it("does not show warning for B2+", async () => {
    mockGetLatest.mockReturnValue({
      status: "DRAFT",
      data: { language: { level: "C1" } }
    });

    render(<LanguageStepForm />);
    const warning = screen.queryByText(/Attention/i);
    expect(warning).toBeNull();
  });

  it("submits form on button click", async () => {
    render(<LanguageStepForm />);
    
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    const option = await screen.findByRole("option", { name: "C1" });
    await userEvent.click(option);

    const submitBtn = screen.getByRole("button", { name: /Valider et Continuer/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateMutation).toHaveBeenCalledWith(expect.objectContaining({
        id: "test-id",
        data: expect.objectContaining({
          language: expect.objectContaining({
            level: "C1",
          }),
        }),
      }));
    });
  });
});
