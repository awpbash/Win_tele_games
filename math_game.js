let running = true;
let solveTimeout;

function solveLoop() {
  if (!running) return;
  
  try {
    const x = parseInt(document.getElementById("task_x")?.textContent || "0");
    const y = parseInt(document.getElementById("task_y")?.textContent || "0");
    const rawOp = document.getElementById("task_op")?.textContent?.trim();
    const op = rawOp
      ?.replace("−", "-")
      ?.replace("–", "-")
      ?.replace("×", "*")
      ?.replace("÷", "/");

    const result = parseInt(
      document.querySelector(".task_eq")?.textContent.replace("=", "").trim()
    );

    let expected;
    switch (op) {
      case "+": expected = x + y; break;
      case "-": expected = x - y; break;
      case "*": expected = x * y; break;
      case "/": expected = Math.floor(x / y); break;
      default: expected = NaN;
    }

    const correct = expected === result;
    console.log(`${x} ${op} ${y} = ${result} → ${correct ? "✅" : "❌"} (Expected: ${expected})`);

    const correctBtn = document.getElementById("button_correct");
    const wrongBtn = document.getElementById("button_wrong");

    if (correct && correctBtn) correctBtn.click();
    else if (!correct && wrongBtn) wrongBtn.click();
  } catch (e) {
    console.warn("Waiting for game to load...");
  }

  // Wait 0.5s before next question
  solveTimeout = setTimeout(solveLoop, 500);
}

// Allow pressing 'q' to stop
document.addEventListener("keydown", function quit(e) {
  if (e.key === "q") {
    running = false;
    clearTimeout(solveTimeout);
    console.log("❌ Bot stopped.");
    document.removeEventListener("keydown", quit);
  }
});

solveLoop();
