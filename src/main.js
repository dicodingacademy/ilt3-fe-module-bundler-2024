import './styles.css';

(async () => {
  const usersList = document.getElementById('users-list');
  const searchBarForm = document.querySelector('#search-bar-container form');

  async function getGitHubUsers(searchValue) {
    if (!searchValue) return [];

    const response = await fetch(`https://api.github.com/search/users?q=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const value = await response.json();
    return [...value.items];
  }

  async function initGitHubUsers() {
    const users = await getGitHubUsers();
    populateGitHubUsers(users);
  }

  function populateGitHubUsers(users) {
    if (users.length < 1) {
      usersList.textContent = 'Menunggu proses pencarian atau data yang dicari tidak ditemukan!';
      return;
    }

    usersList.innerHTML = users
      .map((user) => {
        return `
          <div id="user-item" class="user-item">
            <div class="user-item__image">
              <img src="${user.avatar_url}" alt="${user.login}" />
            </div>
            <div class="user-item__description">
              <div class="user-item__description-name">${user.login}</div>
              <div class="user-item__description-github"><a href="${user.html_url}">${user.html_url}</a></div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  function showLoading() {
    usersList.textContent = 'Loading...';
  }

  async function searchBarHandler(event) {
    event.preventDefault();

    const searchInput = event.target.elements.search;
    try {
      showLoading();
      const users = await getGitHubUsers(searchInput.value);
      populateGitHubUsers(users);

      searchInput.value = '';
    } catch (error) {
      alert('Ups, something went wrong!');
      console.error(error);
    }
  }

  async function init() {
    await initGitHubUsers();

    searchBarForm.addEventListener('submit', searchBarHandler);
    document.addEventListener('DOMContentLoaded', () => {
      // Focus the search input when DOM onloaded
      searchBarForm.elements.search.focus();
    });
  }

  init();
})();
