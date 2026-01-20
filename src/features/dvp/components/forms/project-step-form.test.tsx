import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectStepForm } from "./project-step-form";

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

describe("ProjectStepForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLatest.mockReturnValue({
      id: "test-id",
      status: "DRAFT",
      data: { country: "", city: "", studyType: "" }
    });
  });

  it("renders the form fields correctly", () => {
    render(<ProjectStepForm />);
    expect(screen.getByLabelText(/Pays de destination/i)).toBeDefined();
    expect(screen.getByLabelText(/Ville cible/i)).toBeDefined();
    expect(screen.getByLabelText(/Type d'études/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Valider et Continuer/i })).toBeDefined();
  });

  it("validates required fields", async () => {
    render(<ProjectStepForm />);
    const submitBtn = screen.getByRole("button", { name: /Valider et Continuer/i });

    await userEvent.click(submitBtn);

    expect(mockUpdateMutation).not.toHaveBeenCalled();
  });

  it("submits form on button click", async () => {
    render(<ProjectStepForm />);
    
    // Fill form
    // Country Select
    const countryTrigger = screen.getAllByRole("combobox")[0]; // First select
    if (!countryTrigger) throw new Error("Country select not found");
    await userEvent.click(countryTrigger);
    const countryOption = await screen.findByRole("option", { name: /France/i });
    await userEvent.click(countryOption);

    // City Input
    const cityInput = screen.getByLabelText(/Ville cible/i);
    await userEvent.type(cityInput, "Paris");

    // Study Type Select
    const studyTrigger = screen.getAllByRole("combobox")[1]; // Second select
    if (!studyTrigger) throw new Error("Study select not found");
    await userEvent.click(studyTrigger);
    const studyOption = await screen.findByRole("option", { name: /Master/i });
    await userEvent.click(studyOption);

    // Submit
    const submitBtn = screen.getByRole("button", { name: /Valider et Continuer/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateMutation).toHaveBeenCalledWith(expect.objectContaining({
        id: "test-id",
        data: expect.objectContaining({
          country: "france",
          city: "Paris",
          studyType: "master",
          stepStatus: expect.objectContaining({
            project: "VALIDATED"
          })
        }),
      }));
    });
  });

  it("loads existing data correctly", () => {
    mockGetLatest.mockReturnValue({
      id: "test-id",
      data: { country: "france", city: "Lyon", studyType: "license" }
    });

    render(<ProjectStepForm />);
    expect(screen.getByDisplayValue("Lyon")).toBeDefined();
  });
});
