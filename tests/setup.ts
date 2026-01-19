import { vi } from "vitest";
import "@testing-library/jest-dom";
import "resize-observer-polyfill";

global.ResizeObserver = require("resize-observer-polyfill");

// Fix for Radix UI select in tests
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.setPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();
