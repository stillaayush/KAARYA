// FETCH JOBS FROM SERVER
async function loadJobFeed() {
    const feed = document.getElementById('job-feed');
    if(!feed) return; // Only run on pages with a feed

    try {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();

        feed.innerHTML = jobs.map(job => `
            <div class="pro-card job-post">
                <div class="post-header">
                    <div class="avatar-small">${job.avatar}</div>
                    <div class="post-meta">
                        <h4>${job.company}</h4>
                        <p>Verified Partner • Just now</p>
                    </div>
                </div>
                <div class="post-body">
                    <p>${job.desc}</p>
                    <div class="job-preview-card">
                        <div class="preview-text">
                            <h5>${job.title}</h5>
                            <p>${job.location} • ₹${job.pay}/day</p>
                        </div>
                    </div>
                </div>
                <div class="post-footer">
                    <button class="btn-feed-action" onclick="applyJob(${job.id}, this)">
                        <i class="fa-solid fa-briefcase"></i> Apply Now
                    </button>
                    <button class="btn-feed-action"><i class="fa-regular fa-thumbs-up"></i> Like</button>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error("Feed Sync Error", e);
    }
}

// SAFEPAY APPLY ANIMATION
function applyJob(id, btn) {
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Securing Escrow...';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.innerHTML = 'Applied ✓';
        btn.style.color = '#10B981';
        alert("SafePay Escrow Initiated for Job #" + id + ". Check your Worker Dashboard.");
    }, 1200);
}

window.onload = loadJobFeed;