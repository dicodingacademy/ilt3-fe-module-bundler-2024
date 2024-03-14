import '../styles/styles.css';

import GitHubUser from './github-user';

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
      const users = await GitHubUser.getGitHubUsers(searchInput.value);
      GitHubUser.populateGitHubUsers(users);

      searchInput.value = '';
    } catch (error) {
      const { data, status } = error.response;

      if (status === 401) {
        showErrorMessage(`
          Ups, something went wrong!
          ${data.message}. Please check out GitHub Rest documentation: ${data.documentation_url}.
        `);
        return;
      }

      showErrorMessage(`Ups, something went wrong!`);
    }
  }

  async function init() {
    await GitHubUser.initGitHubUsers({ githubUsersContainer: usersList });

    searchBarForm.addEventListener('submit', searchBarHandler);
    document.addEventListener('DOMContentLoaded', () => {
      // Focus the search input when DOM onloaded
      searchBarForm.elements.search.focus();
    });
  }

  init();
})();
