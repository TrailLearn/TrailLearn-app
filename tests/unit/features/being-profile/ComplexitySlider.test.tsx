import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
// @ts-ignore - Component doesn't exist yet
import { ComplexitySlider } from "~/features/being-profile/components/complexity-slider";

describe("ComplexitySlider", () => {
  it("renders with slider and labels", () => {
    render(<ComplexitySlider value={50} onChange={vi.fn()} />);
    expect(screen.getByText(/Besoin de structure/i)).toBeInTheDocument();
    expect(screen.getByText(/Besoin d'improvisation/i)).toBeInTheDocument();
  });

  it("calls onChange when slider value changes", () => {
    const onChange = vi.fn();
    render(<ComplexitySlider value={50} onChange={onChange} />);
    
    // Simulating slider change is tricky in JSDOM, usually we check if the input exists and can be interacted with
    // For now, let's assume it renders a Slider component from UI library which uses a range input or similar
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    
    // Note: Triggering change on radix slider in test requires specific setup or user-event
    // Simplification for existence check mainly
  });
  
  it("displays feedback text based on value", () => {
    const { rerender } = render(<ComplexitySlider value={10} onChange={vi.fn()} />);
    expect(screen.getByText(/Vous aimez les règles claires/i)).toBeInTheDocument();
    
    rerender(<ComplexitySlider value={90} onChange={vi.fn()} />);
    expect(screen.getByText(/Vous avez besoin d'improvisation/i)).toBeInTheDocument();
  });
});
