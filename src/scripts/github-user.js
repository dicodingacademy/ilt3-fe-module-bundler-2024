import axios from 'axios';

const GitHubUser = {
  async initGitHubUsers({ githubUsersContainer }) {
    this._githubUsersContainer = githubUsersContainer;

    const users = await this.getGitHubUsers();
    this.populateGitHubUsers(users);
  },

  async getGitHubUsers(searchValue) {
    if (!searchValue) return [];

    const { data } = await axios(`https://api.github.com/search/users?q=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    return [...data.items];
  },

  populateGitHubUsers(users) {
    if (users.length < 1) {
      this._githubUsersContainer.textContent =
        'Menunggu proses pencarian atau data yang dicari tidak ditemukan!';
      return;
    }

    this._githubUsersContainer.innerHTML = users
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
  },
};

export default GitHubUser;
