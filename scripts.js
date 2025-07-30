const menu = ["Trà sữa", "Cà phê", "Bánh mì", "Phở bò", "Cơm gà"];

function getTableNumber() {
    const params = new URLSearchParams(window.location.search);
    return params.get("table") || "Không rõ";
}

function buildMenu() {
    const container = document.getElementById("menu-container");
    menu.forEach(item => {
        const html = `
            <label><input type="checkbox" name="items" value="${item}"> ${item}</label><br>
        `;
        container.innerHTML += html;
    });
}

document.getElementById("table-number").textContent = getTableNumber();
buildMenu();

document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const table = getTableNumber();
    const items = [...document.querySelectorAll('input[name="items"]:checked')].map(i => i.value);
    const note = document.querySelector('textarea[name="note"]').value;

    // Gửi đến Google Forms:
    const formURL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
    const data = new FormData();
    data.append("entry.123456789", table);     // Thay bằng đúng ID field
    data.append("entry.987654321", items.join(", "));
    data.append("entry.111111111", note);

    fetch(formURL, { method: "POST", mode: "no-cors", body: data })
      .then(() => alert("✅ Đơn hàng đã gửi!"))
      .catch(() => alert("❌ Gửi lỗi!"));
});
