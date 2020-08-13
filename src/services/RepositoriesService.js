import api from "./api";

class RepositoriesService {
  fetchRepositories = async () => {
    const { data } = await api.get("repositories");
    return data;
  };

  addRepository = async ({ title, url, techs }) => {
    const { data } = await api.post("repositories", {
      title,
      url,
      techs,
    });
    return data;
  };

  deleteRepository = async (id) => {
    await api.delete(`repositories/${id}`);
  };
}

const Repository = new RepositoriesService();
export default Repository;
