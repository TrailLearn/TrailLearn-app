import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShadowZoneForm } from "~/features/being-profile/components/shadow-zone-form";
import { api } from "~/trpc/react";

// Mock TRPC hooks
vi.mock("~/trpc/react", () => ({
  api: {
    beingProfile: {
      getShadow: {
        useQuery: vi.fn(),
      },
      updateShadow: {
        useMutation: vi.fn(),
      },
      deleteShadow: {
        useMutation: vi.fn(),
      },
    },
  },
}));

// Mock Toaster
vi.mock("~/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("ShadowZoneForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Default mocks for mutations to avoid undefined errors
    (api.beingProfile.updateShadow.useMutation as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
    (api.beingProfile.deleteShadow.useMutation as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
  });

  it("requires consent before showing fields", async () => {
    (api.beingProfile.getShadow.useQuery as any).mockReturnValue({
      data: { fears: null, vulnerabilities: null },
      isLoading: false,
    });

    render(<ShadowZoneForm />);

    // Fields should NOT be visible
    expect(screen.queryByLabelText(/Mes Peurs/i)).not.toBeInTheDocument();

    // Consent checkbox should be visible
    const consentCheckbox = screen.getByLabelText(/Je comprends que ces données sont sensibles/i);
    expect(consentCheckbox).toBeInTheDocument();

    // Check consent
    fireEvent.click(consentCheckbox);

    // Fields should now be visible
    expect(await screen.findByLabelText(/Mes Peurs/i)).toBeInTheDocument();
  });

  it("allows skipping without consent", () => {
    (api.beingProfile.getShadow.useQuery as any).mockReturnValue({
      data: { fears: null, vulnerabilities: null },
      isLoading: false,
    });

    const onSkip = vi.fn();
    render(<ShadowZoneForm onSkip={onSkip} />);

    const skipBtn = screen.getByText(/Passer cette étape/i);
    fireEvent.click(skipBtn);

    expect(onSkip).toHaveBeenCalled();
  });

  it("can delete shadow data with immediate effect", async () => {
    (api.beingProfile.getShadow.useQuery as any).mockReturnValue({
      data: { fears: "existing fear", vulnerabilities: null },
      isLoading: false,
    });

    const deleteMock = vi.fn().mockResolvedValue({});
    (api.beingProfile.deleteShadow.useMutation as any).mockReturnValue({
      mutate: deleteMock,
      isPending: false,
    });

    // We also need updateMutation mock for the render
    (api.beingProfile.updateShadow.useMutation as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });

    render(<ShadowZoneForm />);

    // Click the delete button to open dialog
    const deleteBtn = screen.getByText(/Effacer mes ombres/i);
    fireEvent.click(deleteBtn);

    // Dialog should be open, verify warning text
    expect(await screen.findByText(/Cette action est irréversible/i)).toBeInTheDocument();

    // Confirm deletion in the dialog
    const confirmBtn = screen.getByText("Oui, tout effacer");
    fireEvent.click(confirmBtn);

    expect(deleteMock).toHaveBeenCalled();
  });
});
