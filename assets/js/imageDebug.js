// Función para verificar la carga de la imagen con manejo seguro de errores
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('#profile-image');
    
    if (profileImage) {
        // Manejar carga exitosa
        profileImage.addEventListener('load', function() {
            console.log('Imagen cargada exitosamente');
            console.log('Dimensiones:', this.naturalWidth, 'x', this.naturalHeight);
            this.classList.add('loaded');
        });
        
        // Manejar errores de carga de forma segura
        profileImage.addEventListener('error', function() {
            console.warn('Error al cargar la imagen de perfil');
            this.style.border = '2px solid #f44336';
            this.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
            this.alt = 'Error cargando imagen de perfil';
            // Opcional: usar imagen de fallback
            // this.src = 'assets/img/fallback-profile.jpg';
        });
        
        // Verificar si la imagen ya está en caché
        if (profileImage.complete) {
            if (profileImage.naturalHeight !== 0) {
                console.log('Imagen ya estaba cargada (desde caché)');
                console.log('Dimensiones:', profileImage.naturalWidth, 'x', profileImage.naturalHeight);
            } else {
                // Imagen falló al cargar pero está "completa"
                profileImage.dispatchEvent(new Event('error'));
            }
        }
    } else {
        console.log('No se encontró el elemento de la imagen');
    }
});