// Función para verificar la carga de la imagen
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.img-wrapper img');
    
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            console.log('Imagen cargada exitosamente');
            console.log('Dimensiones:', this.naturalWidth, 'x', this.naturalHeight);
        });
        
        // Verificar si la imagen ya está en caché
        if (profileImage.complete) {
            console.log('Imagen ya estaba cargada (desde caché)');
            console.log('Dimensiones:', profileImage.naturalWidth, 'x', profileImage.naturalHeight);
        }
    } else {
        console.log('No se encontró el elemento de la imagen');
    }
});