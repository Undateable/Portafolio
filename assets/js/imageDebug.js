document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('#profile-image');

    if (!profileImage) {
        return;
    }

    profileImage.addEventListener('load', function() {
        this.classList.add('loaded');
        this.classList.remove('image-error');
    });

    profileImage.addEventListener('error', function() {
        this.classList.remove('loaded');
        this.classList.add('image-error');
        this.alt = 'Profile image unavailable';
    });

    if (profileImage.complete && profileImage.naturalHeight === 0) {
        profileImage.dispatchEvent(new Event('error'));
    }
});