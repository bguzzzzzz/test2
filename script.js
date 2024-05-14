document.addEventListener("DOMContentLoaded", function(){
    const orderButtons = document.querySelectorAll(".order-btn");
    const cartItems = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const modal = document.getElementById("checkout-modal");
    const notification = document.getElementById("notification");
    const closeBtn = document.querySelector("#checkout-modal .close"); // Tombol close pada modal
    const cartIcon = document.getElementById("cart-icon"); // Icon keranjang

    let total = 0;
    let cart = []; // Array untuk menyimpan item yang ditambahkan ke keranjang

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = "block"; // Tampilkan notifikasi
        setTimeout(function() {
            notification.style.display = "none"; // Sembunyikan notifikasi setelah beberapa detik
        }, 3000);
    }


    document.getElementById('login-btn').addEventListener('click', function() {
    window.location.href = 'login.html'; // Ganti dengan halaman login yang sesuai
    });



    // Fungsi untuk merender ulang keranjang
    function renderCart() {
        // Kosongkan konten keranjang
        cartItems.innerHTML = "";

        // Render ulang setiap item dalam keranjang
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            // Ubah harga menjadi bilangan bulat tanpa desimal sebelum menampilkan
            const roundedPrice = Math.floor(item.price); // atau Math.ceil(item.price)
            listItem.textContent = `${item.name}: Rp ${roundedPrice}`;
            cartItems.appendChild(listItem);

            // Tambahkan tombol remove untuk setiap item dalam keranjang
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-btn");
            listItem.appendChild(removeButton);

            // Tambahkan event listener untuk menghapus item ketika tombol remove ditekan
            removeButton.addEventListener("click", function() {
                removeItem(index);
            });
        });
    }

    // Fungsi untuk menghapus item dari keranjang
    function removeItem(itemIndex) {        
        const removedItem = cart[itemIndex];
        total -= removedItem.price;
        totalAmount.textContent = `Rp ${Math.floor(total)}`;

        // Hapus item dari array keranjang
        cart.splice(itemIndex, 1);

        // Render ulang keranjang setelah menghapus item
        renderCart();

        // Periksa apakah keranjang kosong, jika ya, set total ke 0
        if (cart.length === 0) {
            total = 0;
            totalAmount.textContent = `Rp ${Math.floor(total)}`;
            // Nonaktifkan tombol Checkout jika keranjang kosong
            checkoutBtn.disabled = true;
        }
    }

    orderButtons.forEach(button => {
        button.addEventListener("click", function() {
            const menuItem = button.parentNode;
            const itemName = menuItem.dataset.name;
            const itemPrice = parseFloat(menuItem.dataset.price);

            // Ubah harga menjadi bilangan bulat tanpa desimal sebelum menambahkan ke keranjang
            const roundedPrice = Math.floor(itemPrice); // atau Math.ceil(itemPrice)

            // Tambahkan item baru ke dalam keranjang
            cart.push({ name: itemName, price: roundedPrice });

            // Render ulang keranjang setelah menambahkan item baru
            renderCart();

            // Hitung total harga setelah menambahkan item baru
            total += roundedPrice;
            totalAmount.textContent = `Rp ${total}`;

            // Aktifkan tombol Checkout setelah menambahkan item
            checkoutBtn.disabled = false;
        });
    });

    checkoutBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    // Event listener untuk tombol close pada modal
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Event listener untuk klik di luar modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Event listener untuk submit form checkout
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value; // Dapatkan nilai nomor telepon
        const payment = document.querySelector('input[name="payment"]:checked').value;
        // Lakukan proses checkout sesuai alamat, nomor telepon, dan metode pembayaran
        const message = `Pesanan Anda berhasil diproses!\nAlamat Pengiriman: ${address}\nNomor Anda: ${phone}\nMetode Pembayaran: ${payment}`;
        showNotification(message);
        // Reset keranjang setelah checkout
        cartItems.innerHTML = "";
        total = 0;
        totalAmount.textContent = "Rp 0";
        modal.style.display = "none";
        // Kosongkan array keranjang setelah checkout
        cart = [];
        // Nonaktifkan tombol Checkout setelah checkout
        checkoutBtn.disabled = true;
    });

    // Disable tombol Checkout saat halaman dimuat jika keranjang kosong
    if (cart.length === 0) {
        checkoutBtn.disabled = true;
    }

    // Tambahkan event listener untuk mengarahkan pengguna ke halaman menu ketika ikon keranjang diklik
    cartIcon.addEventListener("click", function() {
        window.location.href = "index.html";
        
    });
});
