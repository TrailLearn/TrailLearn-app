import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditRuleDialog } from "../edit-rule-dialog";
import { vi, describe, it, expect } from "vitest";

// Mock TRPC
const mockUpdateRule = vi.fn();
vi.mock("~/trpc/react", () => ({
  api: {
    admin: {
      updateRule: {
        useMutation: () => ({
          mutateAsync: mockUpdateRule,
          isPending: false,
        }),
      },
    },
  },
}));

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

describe("EditRuleDialog", () => {
  const mockRule = {
    id: "1",
    key: "paris_rent",
    value: 800,
    category: "housing",
  };

  it("renders trigger button", () => {
    render(<EditRuleDialog rule={mockRule} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens dialog and displays form", async () => {
    render(<EditRuleDialog rule={mockRule} />);
    
    // Click trigger (icon button)
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    // Check for dialog content
    expect(await screen.findByText(/Modifier la règle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Valeur/i)).toHaveValue("800");
  });

  it("validates inputs before submission", async () => {
    render(<EditRuleDialog rule={mockRule} />);
    fireEvent.click(screen.getByRole("button"));

    const submitBtn = await screen.findByText("Enregistrer");
    fireEvent.click(submitBtn);

    // Reason is required (min 5 chars)
    expect(await screen.findByText(/justification doit être explicite/i)).toBeInTheDocument();
  });

  it("submits valid form", async () => {
    render(<EditRuleDialog rule={mockRule} />);
    fireEvent.click(screen.getByRole("button"));

    const valueInput = await screen.findByLabelText(/Valeur/i);
    const reasonInput = screen.getByLabelText(/Justification/i);

    fireEvent.change(valueInput, { target: { value: "900" } });
    fireEvent.change(reasonInput, { target: { value: "Inflation adjustment" } });

    fireEvent.click(screen.getByText("Enregistrer"));

    await waitFor(() => {
      expect(mockUpdateRule).toHaveBeenCalledWith({
        id: "1",
        value: 900, // Should be parsed as number
        reason: "Inflation adjustment",
      });
    });
  });
});
