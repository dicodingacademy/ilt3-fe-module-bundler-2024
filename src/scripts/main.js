import GitHubUser from './github-user.js';

(async () => {
  const usersList = document.getElementById('users-list');
  const searchBarForm = document.querySelector('#search-bar-container form');

  function showLoading() {
    usersList.textContent = 'Loading...';
  }

  function showErrorMessage(message = '') {
    if (!message.length) throw new Error('Please provide the error message!');

    usersList.textContent = message;
  }

  async function searchBarHandler(event) {
    event.preventDefault();

    const searchInput = event.target.elements.search;
    try {
      showLoading();
      const { status, data } = await GitHubUser.getGitHubUsers(searchInput.value);

      if (status < 200 || status >= 300) {
        showErrorMessage(`
          Ups, something went wrong!
          ${data.message}. Please check out GitHub Rest documentation: ${data.documentation_url}.
        `);
        return;
      }

      GitHubUser.populateGitHubUsers(data);

      searchInput.value = '';
    } catch (error) {
      showErrorMessage(`Ups, something went wrong! ${error.message}.`);
    }
  }

  async function init() {
    await GitHubUser.initGitHubUsers({ githubUsersContainer: usersList });

    document.addEventListener('DOMContentLoaded', () => {
      // Focus the search input when DOM onloaded
      searchBarForm.elements.search.focus();
    });
    searchBarForm.addEventListener('submit', searchBarHandler);
  }

  init();
})();
