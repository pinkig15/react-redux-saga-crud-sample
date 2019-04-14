import axios from "axios";

const GET = "GET";

const callFetchUsers = () => {
  return axios({
    method: GET,
    url: "https://api.github.com/users"
  });
};

const callSearchUser = ({ data }) => {
  return axios({
    method: GET,
    url: "https://developer.github.com/v3/search/name=" + data.name
  });
};

export { callFetchUsers, callSearchUser };
