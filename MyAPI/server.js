const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Endpoint untuk mendapatkan semua kontak
app.get('/contacts', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  res.json(contacts);
});

// Endpoint untuk menambahkan kontak baru
app.post('/contacts', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  const newContact = {
    name: req.body.name,
    phone: req.body.phone,
  };
  contacts.push(newContact);
  fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
  res.json(newContact);
});

// Endpoint untuk menghapus kontak berdasarkan ID
app.delete('/contacts/:id', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync('contacts.json'));
  const contactId = req.params.id;
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  fs.writeFileSync('contacts.json', JSON.stringify(updatedContacts, null, 2));
  res.sendStatus(204);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
app.get('/contacts', (req, res) => {
  // Logika untuk mengambil daftar kontak dari file atau sumber data lainnya
  // dan mengirimkannya sebagai respons
  res.send('Daftar kontak');
});
app.post('/contacts', (req, res) => {
  // Mendapatkan data kontak yang dikirimkan dalam body permintaan
  const { name, phone } = req.body;

  // Logika untuk menyimpan kontak ke file atau sumber data lainnya
  // Berikan respons yang sesuai
  res.send('Kontak berhasil ditambahkan');
});
