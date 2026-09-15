import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Test of Popup", () => {
  beforeEach(() => {
    // Reset mock
    vi.clearAllMocks();
  });

  test(`"popup" is output to console.log`, async () => {
    // Spy on console.log
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Execute the test target
    await import("@/src/popup.ts");
    // Verify the results
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("popup"));
    // Remove the spy and restore the original console.log
    logSpy.mockRestore();
  });
});
