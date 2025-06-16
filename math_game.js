let running = true;
let solveTimeout;

function solveLoop() {
    while (running) {
  try {
    const x = parseInt(document.getElementById("task_x")?.textContent || "0");
    const y = parseInt(document.getElementById("task_y")?.textContent || "0");
    const rawOp = document.getElementById("task_op")?.textContent?.trim();
    const op = rawOp
    ?.replace("–", "-")     // normalize unicode minus
    ?.replace("×", "*")      // normalize multiplication
    ?.replace("÷", "/");     // normalize division

    const result = parseInt(document.querySelector(".task_eq")?.textContent.replace("=", "").trim());

    let expected;
    switch (op) {
      case "+": expected = x + y; break;
      case "-": expected = x - y; break;
      case "×": case "*": expected = x * y; break;
      case "÷": case "/": expected = Math.floor(x / y); break;
      default: expected = NaN;
    }

    const correct = expected === result;
    console.log(`${x} ${op} ${y} = ${result} → ${correct ? "✅" : "❌"} (Expected: ${expected})`);

    const correctBtn = document.getElementById("button_correct");
    const wrongBtn = document.getElementById("button_wrong");

    if (correct && correctBtn) correctBtn.click();
    else if (!correct && wrongBtn) wrongBtn.click();

    // Wait 0.5s before next question
    setTimeout(solveLoop, 500);
  } catch (e) {
    console.warn("Waiting for game to load...");
    setTimeout(solveLoop, 500);
  }
}

// Exit on 'q'
document.addEventListener("keydown", function quit(e) {
  if (e.key === "q") {
    running = false;
    clearTimeout(solveTimeout);
    console.log("❌ Bot stopped.");
    document.removeEventListener("keydown", quit);
  }
});
}

solveLoop();
