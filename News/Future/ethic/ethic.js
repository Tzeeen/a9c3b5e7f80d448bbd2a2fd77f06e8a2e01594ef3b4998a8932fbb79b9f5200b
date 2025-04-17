// JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const elementsToAnimate = document.querySelectorAll('h2, h3, p, ul, .ethics-card, .stat-card, .related-article');
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animated');
        if (index % 2 === 0) {
            el.classList.add('delay-1');
        } else {
            el.classList.add('delay-2');
        }
    });

    // Load sample comments
    const sampleComments = [
        {
            author: "Dr. Marcus Wong",
            date: "August 16, 2025",
            text: "As an AI researcher, I appreciate this balanced perspective. We need more public discourse about the ethical dimensions of our work. The challenge is implementing these principles without creating bureaucratic hurdles that slow down beneficial innovations."
        },
        {
            author: "Sarah Johnson",
            date: "August 15, 2025",
            text: "I'm concerned that ethics discussions often happen after technologies are already deployed. We need mandatory impact assessments before any new tech reaches the market, similar to environmental impact statements."
        },
        {
            author: "Raj Patel",
            date: "August 15, 2025",
            text: "The case studies really highlight how these aren't abstract issues - they affect real people's lives every day. More diverse voices need to be included in these conversations, not just tech executives."
        }
    ];

    const commentsContainer = document.getElementById('commentsContainer');
    
    sampleComments.forEach((comment, index) => {
        setTimeout(() => {
            addCommentToPage(comment.author, comment.date, comment.text);
        }, index * 200);
    });

    // Load poll results if available
    const savedPoll = localStorage.getItem('ethicsPoll');
    if (savedPoll) {
        displayPollResults(JSON.parse(savedPoll));
    }
});

function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (commentText === "") {
        alert("Please enter your thoughts before posting.");
        return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    addCommentToPage("You", currentDate, commentText);
    
    // Clear the textarea
    document.getElementById('newComment').value = "";
}

function addCommentToPage(author, date, text) {
    const commentsContainer = document.getElementById('commentsContainer');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment animated';
    
    // Create avatar from initials
    const initials = author.split(' ').map(name => name[0]).join('');
    
    commentDiv.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content">
            <div class="comment-author">${author}</div>
            <div class="comment-date">${date}</div>
            <p>${text}</p>
        </div>
    `;
    commentsContainer.prepend(commentDiv);
}

function submitPoll() {
    // Get the selected radio button
    const selectedOption = document.querySelector('input[name="ethicsReview"]:checked');

    if (!selectedOption) {
        alert("Please select an option before voting.");
        return;
    }

    // Get the label text for the selected option
    const selectedLabel = document.querySelector(`label[for="${selectedOption.id}"]`).textContent;

    // Display results
    alert(`You choose: ${selectedLabel}`);

    // Here you would typically also:
    // 1. Save the vote to localStorage or a database
    // 2. Update the visual poll results display
}

// Share functions
function getArticleUrl() {
    return window.location.href || 'https://techethics-journal.com/ethics-emerging-technologies';
}

function getArticleTitle() {
    return document.title || 'Ethics and Challenges of Emerging Technologies';
}

function shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getArticleUrl())}&text=${encodeURIComponent(getArticleTitle())}`;
    window.open(url, '_blank');
    showMessage('Shared on Twitter!');
}

function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getArticleUrl())}`;
    window.open(url, '_blank');
    showMessage('Shared on Facebook!');
}

function shareOnLinkedIn() {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getArticleUrl())}&title=${encodeURIComponent(getArticleTitle())}`;
    window.open(url, '_blank');
    showMessage('Shared on LinkedIn!');
}

function shareViaEmail() {
    const subject = encodeURIComponent(getArticleTitle());
    const body = encodeURIComponent(`Check out this article about technology ethics: ${getArticleUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showMessage('Email draft opened!');
}

function copyToClipboard() {
    navigator.clipboard.writeText(getArticleUrl())
        .then(() => showMessage('Link copied to clipboard!'))
        .catch(() => showMessage('Failed to copy link'));
}

function showMessage(text) {
    const messageEl = document.getElementById('shareMessage');
    messageEl.textContent = text;
    setTimeout(() => {
        messageEl.textContent = '';
    }, 3000);
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('h2, h3, p, ul, .ethics-card, .stat-card, .related-article').forEach(el => {
    observer.observe(el);
});

// Get the button
let backToTopButton = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}