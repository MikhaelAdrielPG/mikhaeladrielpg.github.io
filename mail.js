const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contact-form");

document.getElementById("contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const name = getElementVal("name");
  const email = getElementVal("email");
  const message = getElementVal("message");

  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    // Validasi spasi, null, dan kosong
    showErrorToast("Mohon isi semua kolom.");
  } else if (!/^[a-zA-Z0-9 ]*$/.test(name)) {
    // Validasi nama tanpa karakter khusus
    showErrorToast("Nama tidak boleh mengandung karakter khusus.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // Validasi format email
    showErrorToast("Format email tidak valid.");
  } else if (message.length < 5) {
    // Validasi message minimal 5 karakter
    showErrorToast("Pesan harus terdiri dari minimal 5 karakter.");
  } else {
    saveMessages(name, email, message);
    document.getElementById("contact-form").reset();
    showSuccessToast("Pesan berhasil dikirim!");
  }
}

function showErrorToast(message) {
  Toastify({
    text: message,
    style: {
      background: "#ff6347",
    },
  }).showToast();
}

function showSuccessToast(message) {
  Toastify({
    text: message,
    style: {
      background: "green",
    },
  }).showToast();
}

const saveMessages = (name, email, message) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    message: message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
