document.getElementById("processorForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    // Formdaki bilgileri al
    var processorName = document.getElementById("processorName").value;
    var processorSpeed = document.getElementById("processorSpeed").value;

    // Yeni işlemci objesi oluştur
    var newProcessor = {
        "name": processorName,
        "speed": processorSpeed
    };

    // İşlemci.json dosyasını oku
    fetch("işlemci.json")
        .then(response => response.json())
        .then(data => {
            // Yeni işlemciyi ekle
            data.push(newProcessor);

            // Güncellenmiş veriyi işlemci.json dosyasına yaz
            fetch("cpu.json", {
                method: "PUT", // ya da "POST" olarak da kullanılabilir
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert("İşlemci başarıyla eklendi!");
                        // Burada isteğe bağlı olarak sayfayı yenileyebilirsiniz
                        // window.location.reload();
                    } else {
                        alert("Bir hata oluştu, işlemci eklenemedi.");
                    }
                })
                .catch(error => {
                    console.error("İstek hatası:", error);
                    alert("Bir hata oluştu, işlemci eklenemedi.");
                });
        })
        .catch(error => {
            console.error("Veri okuma hatası:", error);
            alert("Bir hata oluştu, işlemci eklenemedi.");
        });
});