async function fetchRepoInfo(repoOwner, repoName, elementId) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${data.message}`);
        }

        const repoInfo = document.getElementById(elementId);
        repoInfo.innerHTML = `
            <h1>${data.name}</h1>
            <p><strong>Description:</strong> ${data.description || 'No description available.'}</p>
            <p><strong>Stars:</strong> ${data.stargazers_count}</p>
            <p><strong>Forks:</strong> ${data.forks_count}</p>
            <p><strong>Open Issues:</strong> ${data.open_issues_count}</p>
            <p><a href="${data.html_url}" target="_blank">View on GitHub</a></p>
        `;
    } catch (error) {
        console.error('Error fetching repository information:', error);
        document.getElementById(elementId).innerHTML = `<p>Error fetching repository information.</p>`;
    }
}
