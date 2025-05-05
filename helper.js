// helper.js - Fungsi Bantuan untuk Vektor 3D

// Menambahkan dua vektor
function add(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
}

// Mengurangkan vektor v2 dari v1
function subtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
}

// Mengalikan vektor dengan skalar
function multiplyScalar(v, s) {
    return { x: v.x * s, y: v.y * s, z: v.z * s };
}

// Menghitung dot product dua vektor
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

// Menghitung kuadrat panjang (magnitude) vektor (lebih cepat dari length)
function lengthSquared(v) {
    return v.x * v.x + v.y * v.y + v.z * v.z;
}

// Menghitung panjang (magnitude) vektor
function length(v) {
    return Math.sqrt(lengthSquared(v));
}

// Menghasilkan vektor satuan (panjang = 1)
function normalize(v) {
    const len = length(v);
    if (len === 0) {
        return { x: 0, y: 0, z: 0 }; // Hindari pembagian dengan nol
    }
    return multiplyScalar(v, 1 / len);
}

// --- (Jika Anda membutuhkan fungsi matriks di masa depan, tambahkan di sini) ---
// Saat ini belum diperlukan untuk demo sederhana ini.