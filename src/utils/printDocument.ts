export function printDocument(
  documentRoot: HTMLElement | null,
  title: string,
): boolean {
  if (!documentRoot) return false;

  // Check if we're in a sandboxed iframe where print might be blocked
  try {
    if (window.self !== window.top) {
      // We're in an iframe - check if we can access window.print
      // In sandboxed iframes, this will throw a SecurityError
      void window.print;
    }
  } catch (err) {
    console.warn("Cannot access window.print - likely sandboxed iframe:", err);
    return false;
  }

  // Safari's `onbeforeprint` fires before layout, so build the copy up front.
  const root = document.createElement("div");
  root.id = "btk-print-root";
  Array.from(documentRoot.children).forEach((child) => {
    root.appendChild(child.cloneNode(true));
  });
  root.querySelectorAll(".print-hide").forEach((el) => el.remove());

  const host = document.createElement("div");
  host.id = "btk-print-host";
  host.dataset.title = title;
  host.appendChild(root);
  document.body.appendChild(host);
  document.body.classList.add("printing-document");

  let done = false;
  const cleanup = () => {
    if (done) return;
    done = true;
    try {
      window.removeEventListener("afterprint", cleanup);
    } catch {
      // Ignore errors during cleanup
    }
    try {
      document.body.classList.remove("printing-document");
    } catch {
      // Ignore
    }
    try {
      host.remove();
    } catch {
      // Ignore
    }
  };

  try {
    window.addEventListener("afterprint", cleanup);
  } catch (err) {
    console.warn("Failed to add afterprint listener:", err);
    // Still try to print, but use timeout cleanup
  }

  // Fallback cleanup for browsers that never emit afterprint
  const timeoutId = setTimeout(cleanup, 120000);

  // Clear the timeout when cleanup happens normally
  const cleanupWithTimeout = () => {
    clearTimeout(timeoutId);
    cleanup();
  };

  // Re-add the listener with the new cleanup
  try {
    window.removeEventListener("afterprint", cleanup);
    window.addEventListener("afterprint", cleanupWithTimeout);
  } catch {
    // Ignore
  }

  try {
    const printResult = window.print();
    // window.print() returns false if it was cancelled, but we still consider it successful
    // if the dialog opened
    return true;
  } catch (err) {
    console.warn(
      "window.print() was blocked by the browser or iframe sandbox:",
      err,
    );
    cleanupWithTimeout();
    return false;
  }
}