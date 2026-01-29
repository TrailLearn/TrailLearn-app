import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
// @ts-ignore - Component doesn't exist yet
import { TrvSelector } from "~/features/being-profile/components/trv-selector";

describe("TrvSelector", () => {
  it("renders with options", () => {
    render(<TrvSelector onSelect={vi.fn()} />);
    expect(screen.getByText(/Votre rythme naturel/i)).toBeInTheDocument();
  });

  it("calls onSelect when an option is selected", () => {
    const onSelect = vi.fn();
    render(<TrvSelector onSelect={onSelect} isSaving={false} />);
    
    // Assuming we use cards or buttons for options
    const option = screen.getByText(/6 mois/i);
    fireEvent.click(option);
    
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({
      trvFrequency: 6,
      trvLabel: "6 mois"
    }));
  });

  it("shows saving indicator when isSaving is true", () => {
    render(<TrvSelector onSelect={vi.fn()} isSaving={true} />);
    expect(screen.getByText(/Sauvegarde en cours/i)).toBeInTheDocument();
  });
});
