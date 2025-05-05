// script.js - Logika Ray Tracing Sederhana

// Tunggu hingga DOM siap
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rayCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // --- Definisi Scene ---
    const camera = {
        origin: { x: 0, y: 0, z: -3 }, // Posisi kamera sedikit di depan layar
        // Kita akan menghitung arah ray per piksel, jadi tidak perlu arah kamera global
    };

    const sphere = {
        center: { x: 0, y: 0, z: 0 }, // Pusat bola di tengah scene
        radius: 1.0,                  // Radius bola
        color: { r: 255, g: 0, b: 0 } // Warna bola (merah)
    };

    const backgroundColor = { r: 135, g: 206, b: 250 }; // Warna latar belakang (biru langit)

    // --- Fungsi Ray-Sphere Intersection ---
    // Mengembalikan nilai t (jarak) jika ada intersection, atau null jika tidak
    function intersectSphere(rayOrigin, rayDirection, sphere) {
        const oc = subtract(rayOrigin, sphere.center); // Vektor dari pusat bola ke asal ray
        const a = dot(rayDirection, rayDirection); // Harus 1 jika rayDirection dinormalisasi
        const b = 2.0 * dot(oc, rayDirection);
        const c = dot(oc, oc) - sphere.radius * sphere.radius;
        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return null; // Tidak ada intersection
        } else {
            // Hitung dua solusi t
            const t1 = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            const t2 = (-b + Math.sqrt(discriminant)) / (2.0 * a);

            // Kita ingin intersection terdekat yang berada di depan kamera (t > 0)
            if (t1 > 0.001) return t1; // Cek t1 dulu karena lebih kecil
            if (t2 > 0.001) return t2; // Jika t1 negatif atau terlalu dekat, cek t2

            return null; // Kedua intersection di belakang atau terlalu dekat
        }
    }

    // --- Proses Rendering ---
    function render() {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        // Loop melalui setiap piksel di canvas
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // 1. Konversi koordinat piksel (x, y) ke koordinat viewport (-1 to 1)
                //    Viewport dianggap berada pada z=0 untuk simplifikasi
                const viewportX = (2 * (x + 0.5) / width - 1.0); // * aspect ratio jika perlu
                const viewportY = (1.0 - 2 * (y + 0.5) / height); // Y dibalik karena canvas Y ke bawah

                // 2. Tentukan arah ray dari kamera melalui titik viewport
                //    Titik pada viewport: { x: viewportX, y: viewportY, z: 0 } (disederhanakan)
                //    Arah = normalize(titikViewport - cameraOrigin)
                const pixelPosWorld = { x: viewportX, y: viewportY, z: 0 }; // Titik target di z=0 plane
                const rayDirection = normalize(subtract(pixelPosWorld, camera.origin));

                // 3. Lakukan tes intersection ray dengan bola
                const intersectionT = intersectSphere(camera.origin, rayDirection, sphere);

                // 4. Tentukan warna piksel
                let pixelColor = backgroundColor;
                if (intersectionT !== null) {
                    pixelColor = sphere.color; // Jika kena bola, gunakan warna bola
                }

                // 5. Set warna piksel pada ImageData
                const index = (y * width + x) * 4; // Index awal R, G, B, A untuk piksel (x,y)
                data[index]     = pixelColor.r; // R
                data[index + 1] = pixelColor.g; // G
                data[index + 2] = pixelColor.b; // B
                data[index + 3] = 255;          // A (Alpha = Penuh)
            }
        }

        // Gambar ImageData ke canvas
        ctx.putImageData(imageData, 0, 0);
        console.log("Rendering complete.");
    }

    // Mulai rendering
    render();
});