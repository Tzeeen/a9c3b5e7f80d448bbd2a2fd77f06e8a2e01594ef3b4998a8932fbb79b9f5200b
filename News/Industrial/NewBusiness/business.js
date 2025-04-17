// Share functions
function getArticleUrl() {
    return window.location.href || 'https://example.com/smart-cities-future-urban-living';
}

function getArticleTitle() {
    return document.title || 'Smart Cities and the Future of Urban Living';
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
    const body = encodeURIComponent(`Check out this article about smart cities: ${getArticleUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showMessage('Email draft opened!');
}

function copyToClipboard() {
    navigator.clipboard.writeText(getArticleUrl())
        .then(() => showMessage('Link copied to clipboard!'))
        .catch(() => showMessage('Failed to copy link'));
}

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