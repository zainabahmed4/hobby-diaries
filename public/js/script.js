document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // View Post Modal
    const viewPostModal = document.getElementById('viewPostModal');
    const closeViewPost = document.getElementById('closeViewPost');
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get post data from data attributes
            const title = this.dataset.title;
            const date = this.dataset.date;
            const tag = this.dataset.tag;
            const author = this.dataset.author;
            const content = this.dataset.content;
            const image = this.dataset.image;

            // Populate modal with post data
            document.getElementById('viewPostTitle').textContent = title;
            document.getElementById('viewPostDate').textContent = date;
            document.getElementById('viewPostTag').textContent = tag;
            document.getElementById('viewPostAuthor').textContent = `by ${author}`;
            document.getElementById('viewPostContent').textContent = content;
            document.getElementById('viewPostImage').src = image;
            document.getElementById('viewPostImage').alt = title;

            // Show modal
            viewPostModal.style.display = 'block';
        });
    });

    closeViewPost.addEventListener('click', function() {
        viewPostModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === viewPostModal) {
            viewPostModal.style.display = 'none';
        }
    });

    // ... rest of existing code ...
}); 