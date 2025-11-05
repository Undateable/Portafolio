// SCRIPT DE PRUEBA CSP
// Ejecuta este código en la consola para probar CSP

console.log('🔒 Probando Content Security Policy...');

// Test 1: Intentar inyectar script malicioso (debería fallar)
try {
    const maliciousScript = document.createElement('script');
    maliciousScript.innerHTML = 'alert("XSS Attack!")';
    document.head.appendChild(maliciousScript);
    console.log('❌ CSP FALLO: Script malicioso ejecutado');
} catch (error) {
    console.log('✅ CSP EXITOSO: Script malicioso bloqueado', error);
}

// Test 2: Verificar recursos permitidos
const testImage = new Image();
testImage.onload = () => console.log('✅ Imágenes del dominio: PERMITIDAS');
testImage.onerror = () => console.log('❌ Imágenes del dominio: BLOQUEADAS');
testImage.src = 'assets/img/logodp.png';

// Test 3: Verificar recursos externos
const externalTest = new Image();
externalTest.onload = () => console.log('❌ CSP FALLO: Imagen externa cargada');
externalTest.onerror = () => console.log('✅ CSP EXITOSO: Imagen externa bloqueada');
externalTest.src = 'https://example.com/malicious.jpg';

console.log('🔍 Revisa la consola para ver los resultados de CSP');