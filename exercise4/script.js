function Calculate() {
    const fnum = document.getElementById("fnum").value;
    const secnum = document.getElementById("secnum").value;
    const operator = document.getElementById("operator").value;
    let result;

    switch (operator) {
        case "+": result = parseInt(fnum) + parseInt(secnum);
            break;
        case "*": result = parseInt(fnum) * parseInt(secnum);
            break;
        case "-": result = parseInt(fnum) - parseInt(secnum);
            break;
        case "/": result = parseInt(fnum) / parseInt(secnum);
            break;
        default:
            reset;
    }

    document.getElementById("result").textContent = `Result: ${result}`;
    return false;
}
