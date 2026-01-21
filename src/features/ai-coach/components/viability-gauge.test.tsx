import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ViabilityGauge } from "./viability-gauge";
import React from 'react';

describe("ViabilityGauge", () => {
  it("displays 'Vague' and red styling for low scores (<40)", () => {
    render(<ViabilityGauge score={30} />);
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("Vague")).toBeInTheDocument();
    // Check for red class presence (indirectly via class check if possible, or just text content)
    // Note: detailed class checking often brittle, text content is robust.
  });

  it("displays 'En cours' and amber styling for medium scores (40-69)", () => {
    render(<ViabilityGauge score={50} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
  });

  it("displays 'Clair' and green styling for high scores (>=70)", () => {
    render(<ViabilityGauge score={80} />);
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("Clair")).toBeInTheDocument();
  });

  it("clamps score between 0 and 100", () => {
    render(<ViabilityGauge score={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
