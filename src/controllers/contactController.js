exports.showContactForm = (req, res) => {
    res.render("contact", { url: 'http://localhost:3030/' });
};

exports.submitContactForm = (req, res) => {
    const { name, email, message } = req.body;

    // Logika pengolahan pesan, misalnya simpan ke database atau kirim email
    console.log(`Pesan dari ${name} (${email}): ${message}`);

    // Kirim balasan setelah pengolahan
    res.send('<h2>Terima kasih telah mengirimkan pesan kami. Kami akan segera menghubungi Anda.</h2>');
};
