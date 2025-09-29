let cart = [];

function addToCart(name, price) {
  let item = cart.find((p) => p.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter((p) => p.name !== name);
  renderCart();
}

function updateQty(name, qty) {
  let item = cart.find((p) => p.name === name);
  if (item) {
    item.qty = parseInt(qty);
    if (item.qty <= 0) {
      removeFromCart(name);
    }
  }
  renderCart();
}

function renderCart() {
  let tbody = document.querySelector("#cartTable tbody");
  tbody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Giỏ hàng trống</td></tr>";
  } else {
    cart.forEach((item) => {
      let row = `<tr>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td class="qty-cell">
  <button onclick="updateQty('${item.name}', ${item.qty - 1})">-</button>
  <input type="text" value="${item.qty}" readonly>
  <button onclick="updateQty('${item.name}', ${item.qty + 1})">+</button>
</td>

        <td>${(item.price * item.qty).toLocaleString()}đ</td>
        <td><button onclick="removeFromCart('${item.name}')">Xóa</button></td>
      </tr>`;
      tbody.innerHTML += row;
      total += item.price * item.qty;
    });
  }

  document.getElementById("grandTotal").innerText =
    "Tổng cộng: " + total.toLocaleString() + "đ";
}
