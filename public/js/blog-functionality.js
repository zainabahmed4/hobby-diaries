document.addEventListener('DOMContentLoaded', () => {
    // Modal elements
    const modal = document.getElementById('createPostModal');
    const openModalBtn = document.getElementById('openCreatePost');
    const closeModalBtn = document.getElementById('closeCreatePost');
    const createPostForm = document.getElementById('createPostForm');

    // Category filtering
    const categoryTags = document.querySelectorAll('.category-tag');

    // Load and display sample posts first
    samplePosts.forEach(post => addNewPostToPage(post));

    // Load user posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    userPosts.forEach(post => addNewPostToPage(post));

    // Modal handling
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submission
    createPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('postTitle').value,
            author: document.getElementById('postAuthor').value,
            content: document.getElementById('postContent').value,
            tag: document.getElementById('postTag').value,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            image: tagImages[document.getElementById('postTag').value]
        };

        // Add to localStorage
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        userPosts.unshift(newPost);
        localStorage.setItem('userPosts', JSON.stringify(userPosts));

        // Add to page
        addNewPostToPage(newPost);
        modal.style.display = 'none';
        createPostForm.reset();
    });

    // Category filtering
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');

            const selectedTag = tag.dataset.tag;
            
            // Update visibility for all posts including newly added ones
            document.querySelectorAll('.blog-post').forEach(post => {
                if (selectedTag === 'ALL' || post.dataset.tag === selectedTag) {
                    post.style.display = 'flex';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Function to add new post to the page
    function addNewPostToPage(post) {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.dataset.tag = post.tag;

        // Get currently selected category
        const activeTag = document.querySelector('.category-tag.active').dataset.tag;
        
        // Set initial display based on current category
        if (activeTag !== 'ALL' && activeTag !== post.tag) {
            article.style.display = 'none';
        } else {
            article.style.display = 'flex';
        }

        article.innerHTML = `
            <div class="post-meta">
                <span class="date">${post.date}</span>
                <span class="tag">${post.tag}</span>
            </div>
            <img src="${post.image}" alt="${post.title}">
            <h2>${post.title}</h2>
            <p class="author">by ${post.author}</p>
            <div class="post-content" style="display: none;">
                ${post.content}
            </div>
            <a href="#" class="read-more" 
               data-title="${post.title}"
               data-date="${post.date}"
               data-tag="${post.tag}"
               data-author="${post.author}"
               data-content="${post.content}"
               data-image="${post.image}">
                READ MORE
            </a>
        `;

        document.querySelector('.blog-grid').prepend(article);

        // Add click event listener for the new post's read more button
        const readMoreBtn = article.querySelector('.read-more');
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get post data from data attributes
            const title = readMoreBtn.dataset.title;
            const date = readMoreBtn.dataset.date;
            const tag = readMoreBtn.dataset.tag;
            const author = readMoreBtn.dataset.author;
            const content = readMoreBtn.dataset.content;
            const image = readMoreBtn.dataset.image;

            // Populate view modal with post data
            document.getElementById('viewPostTitle').textContent = title;
            document.getElementById('viewPostDate').textContent = date;
            document.getElementById('viewPostTag').textContent = tag;
            document.getElementById('viewPostAuthor').textContent = `by ${author}`;
            document.getElementById('viewPostContent').textContent = content;
            document.getElementById('viewPostImage').src = image;
            document.getElementById('viewPostImage').alt = title;

            // Show view modal
            document.getElementById('viewPostModal').style.display = 'block';
        });
    }
}); 